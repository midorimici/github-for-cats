export const setupObservers = (mainFunc: (baseElement: Element) => void) => {
  const targetElement = document.getElementById('repo-content-turbo-frame');
  if (targetElement === null) {
    return;
  }

  setupPageTransitionObserver(mainFunc, targetElement);
  setupTimelineObserver(mainFunc, targetElement);
};

const setupPageTransitionObserver = (
  mainFunc: (baseElement: Element) => void,
  targetElement: HTMLElement
) => {
  const callback: MutationCallback = () => {
    if (/pull\/\d+$/.test(location.pathname)) {
      return;
    }

    if (targetElement.hasAttribute('complete')) {
      mainFunc(targetElement);
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetElement, { attributeFilter: ['complete'] });
};

const setupTimelineObserver = (
  mainFunc: (baseElement: Element) => void,
  targetElement: HTMLElement
) => {
  const callback: MutationCallback = (mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      if (mutation.type !== 'childList') {
        continue;
      }

      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) {
          continue;
        }

        const classes = node.classList;
        if (
          classes.contains('js-timeline-item') ||
          classes.contains('review-comment') ||
          node.getElementsByClassName('review-comment').length > 0
        ) {
          mainFunc(node);
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetElement, { childList: true, subtree: true });
};
