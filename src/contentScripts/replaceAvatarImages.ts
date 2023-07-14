import { catImageURLs } from './api';
import { fetchFromStorage, saveToStorage } from '../lib/storage';

export const replaceAvatarImages = (baseElement: Element) => {
  const images = findAvatarImages(baseElement);
  replace(images);
};

const findAvatarImages = (baseElement: Element): Element[] => {
  const images: Element[] = [];

  const avatars = baseElement.getElementsByClassName('avatar');
  for (const avatar of avatars) {
    if (avatar.nodeName === 'IMG') {
      images.push(avatar);
      continue;
    }

    const image = avatar.firstElementChild;
    if (image === null) {
      console.debug('avatar child node not found', avatar);
      continue;
    }

    images.push(image);
  }

  return images;
};

const per = 10;

const replace = async (images: Element[]) => {
  const [imgMap, userNames] = await Promise.all([fetchImageMap(), fetchSkipUsers()]);

  const skipUserNameRegex = new RegExp(`^(?:Owner avatar|${userNames.join('|')})$`);
  const pageUserNameImageMap = userNameImageMap(images, skipUserNameRegex);

  const pageUserNameSet = new Set(pageUserNameImageMap.keys());
  const storedUserNameSet = new Set(imgMap.keys());
  const imageNeededUserNameSet = diff(pageUserNameSet, storedUserNameSet);

  const userCount = imageNeededUserNameSet.size;
  if (userCount > 0) {
    const URLs = await imageURLs(userCount);

    for (const [i, userName] of [...imageNeededUserNameSet].entries()) {
      if (i >= URLs.length) {
        break;
      }

      imgMap.set(userName, URLs[i]);
    }
  }

  for (const [userName, images] of pageUserNameImageMap) {
    for (const image of images) {
      const URL = imgMap.get(userName);
      if (URL === undefined) {
        continue;
      }

      image.setAttribute('src', URL);
      image.setAttribute('style', 'object-fit: cover;');
    }
  }

  if (userCount > 0) {
    saveToStorage('avatarImages', Object.fromEntries(imgMap));
  }
};

const fetchImageMap = async (): Promise<Map<string, string>> => {
  const { avatarImages } = await fetchFromStorage(['avatarImages']);
  const mp = new Map(Object.entries(avatarImages));
  return mp;
};

const fetchSkipUsers = async (): Promise<string[]> => {
  const { skipUsers } = await fetchFromStorage(['skipUsers']);
  return skipUsers;
};

type UserNameImageMap = Map<string, Set<Element>>;

const userNameImageMap = (images: Element[], skipUserNameRegex: RegExp): UserNameImageMap => {
  const mp: UserNameImageMap = new Map();
  for (const image of images) {
    const userName = userNameFromImage(image);
    if (userName === null || skipUserNameRegex.test(userName)) {
      continue;
    }

    const s = mp.get(userName);
    if (s === undefined) {
      mp.set(userName, new Set([image]));
    } else {
      s.add(image);
    }
  }
  return mp;
};

const userNameFromImage = (image: Element): string | null => {
  const altText = image.getAttribute('alt');
  if (altText === null || altText === '') {
    return null;
  }

  return altText.replace('@', '');
};

const diff = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  let d = new Set(a);
  for (const e of b) {
    d.delete(e);
  }
  return d;
};

const imageURLs = async (userCount: number): Promise<string[]> => {
  const APICallTime = Math.floor(userCount / per) + 1;
  const URLPromises: Promise<string[]>[] = [];
  for (let i = 0; i < APICallTime; i++) {
    const count = i === APICallTime - 1 ? userCount - per * i : per;
    const URLs = catImageURLs(count, true);
    URLPromises.push(URLs);
  }
  return (await Promise.all(URLPromises)).flat();
};
