import { catImageURL } from './api';

export const addCatImages = async () => {
  const comments = document.getElementsByClassName('comment-body');
  for (const comment of comments) {
    const image = await createImage();
    comment.appendChild(image);
  }
};

const createImage = async (): Promise<Element> => {
  const image = document.createElement('img');

  const imageURL = await catImageURL(true);
  image.setAttribute('src', imageURL);

  return image;
};
