import { catImageURLs } from './api';

const per = 10;

export const addCatImages = async () => {
  const comments = targetComments();
  const commentCount = comments.length;

  if (commentCount === 0) {
    return;
  }

  const APICallTime = Math.floor(commentCount / per) + 1;

  const imagePromises: Promise<Element[]>[] = [];
  for (let i = 0; i < APICallTime; i++) {
    const count = i === APICallTime - 1 ? commentCount - per * i : per;
    const images = createImages(count);
    imagePromises.push(images);
  }
  const images = (await Promise.all(imagePromises)).flat();
  const shuffledImages = shuffle(images);

  for (let i = 0; i < commentCount; i++) {
    if (i >= shuffledImages.length) {
      break;
    }

    comments[i].appendChild(shuffledImages[i]);
  }
};

const targetComments = (): Element[] => {
  const comments = document.getElementsByClassName('comment-body');

  const targets: Element[] = [];
  for (const comment of comments) {
    if (hasMediaAsLastChild(comment)) {
      continue;
    }

    targets.push(comment);
  }

  return targets;
};

const hasMediaAsLastChild = (comment: Element): boolean => {
  const lastElement = comment.lastElementChild;
  if (lastElement === null) {
    return false;
  }

  return (
    lastElement.getElementsByTagName('img').length > 0 ||
    lastElement.getElementsByTagName('video').length > 0
  );
};

const createImages = async (count: number): Promise<Element[]> => {
  const imageURLs = await catImageURLs(count, false);
  const images: Element[] = [];
  for (const URL of imageURLs) {
    const image = createImage(URL);
    images.push(image);
  }
  return images;
};

const createImage = (imageURL: string): Element => {
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferer nofollow');
  a.setAttribute('href', imageURL);

  const image = document.createElement('img');
  image.setAttribute('src', imageURL);

  a.appendChild(image);

  return a;
};

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }

  return a;
};
