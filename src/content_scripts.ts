import { addCatImages } from './add_images';
import { addSuffixes } from './add_suffixes';
import { replaceAvatarImages } from './replace_avatar_images';

const main = () => {
  addSuffixes();
  replaceAvatarImages();
  addCatImages();
};

main();
