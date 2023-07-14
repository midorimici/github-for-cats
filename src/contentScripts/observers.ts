export const setupObservers = (mainFunc: (baseElement: Element) => void) => {
  setupPageTransitionObserver(mainFunc);
  setupTimelineObserver(mainFunc);
};

const setupPageTransitionObserver = (mainFunc: (baseElement: Element) => void) => {
  const target = document.getElementById('repo-content-turbo-frame');
  if (target === null) {
    return;
  }

  const callback: MutationCallback = () => {
    if (target.hasAttribute('complete')) {
      mainFunc(target);
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(target, { attributeFilter: ['complete'] });
};

const setupTimelineObserver = (mainFunc: (baseElement: Element) => void) => {
  const timeline = document.getElementsByClassName('js-discussion')[0];
  if (timeline === null) {
    return;
  }

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
        if (classes.contains('js-timeline-item') || classes.contains('review-comment')) {
          mainFunc(node);
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(timeline, { childList: true, subtree: true });
};
