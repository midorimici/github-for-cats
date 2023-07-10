import { addCatImages } from './add_images';
import { addSuffixes } from './add_suffixes';
import { fetchFromStorage } from './lib/storage';
import { replaceAvatarImages } from './replace_avatar_images';

const main = async () => {
  const { isSuffixEnabled, isAvatarImageReplacementEnabled, isAddImagesToCommentsEnabled } =
    await fetchFromStorage([
      'isSuffixEnabled',
      'isAvatarImageReplacementEnabled',
      'isAddImagesToCommentsEnabled',
    ]);
  if (isSuffixEnabled) {
    addSuffixes();
  }

  if (isAvatarImageReplacementEnabled) {
    replaceAvatarImages();
  }

  if (isAddImagesToCommentsEnabled) {
    addCatImages();
  }
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

chrome.runtime.onMessage.addListener(
  (msg: { refreshImages: boolean }, _, sendResponse: (response: boolean) => void) => {
    if (msg.refreshImages === true) {
      replaceAvatarImages();
      sendResponse(true);
    }
    sendResponse(false);
  }
);
