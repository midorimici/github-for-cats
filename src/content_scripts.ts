import { addCatImages } from './add_images';
import { addSuffixes } from './add_suffixes';
import { replaceAvatarImages } from './replace_avatar_images';

const main = () => {
  addSuffixes();
  replaceAvatarImages();
  addCatImages();
};

const setupObserver = () => {
  const target = document.getElementById('repo-content-turbo-frame');
  if (target === null) {
    return;
  }

  const callback = () => {
    if (target.hasAttribute('complete')) {
      main();
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(target, { attributeFilter: ['complete'] });
};

main();
setupObserver();
