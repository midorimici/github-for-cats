import { catImageURL } from './api';

export const addCatImages = async () => {
  const comments = document.getElementsByClassName('comment-body');
  const commentCount = comments.length;

  const imagePromises: Promise<Element>[] = [];
  for (let i = 0; i < commentCount; i++) {
    const image = createImage();
    imagePromises.push(image);
  }
  const images = await Promise.all(imagePromises);

  for (let i = 0; i < commentCount; i++) {
    comments[i].appendChild(images[i]);
  }
};

const createImage = async (): Promise<Element> => {
  const image = document.createElement('img');

  const imageURL = await catImageURL(false);
  image.setAttribute('src', imageURL);

  return image;
};
