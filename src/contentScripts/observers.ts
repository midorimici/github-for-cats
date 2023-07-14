export const setupObservers = (mainFunc: (baseElement: Element) => void) => {
  setupPageTransitionObserver(mainFunc);
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
