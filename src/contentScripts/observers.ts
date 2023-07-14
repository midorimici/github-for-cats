export const setupObservers = (mainFunc: () => void) => {
  setupPageTransitionObserver(mainFunc);
};

const setupPageTransitionObserver = (mainFunc: () => void) => {
  const target = document.getElementById('repo-content-turbo-frame');
  if (target === null) {
    return;
  }

  const callback: MutationCallback = () => {
    if (target.hasAttribute('complete')) {
      mainFunc();
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(target, { attributeFilter: ['complete'] });
};
