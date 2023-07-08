export const replaceAvatarImages = () => {
  const images = findAvatarImages();
  replace(images);
};

const findAvatarImages = (): Element[] => {
  const images: Element[] = [];

  const avatars = document.getElementsByClassName('avatar');
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

const replace = async (images: Element[]) => {
  const imgMap: Map<string, string> = new Map();

  for (const image of images) {
    const userName = userNameFromImage(image);
    if (userName === null) {
      continue;
    }

    let newImageURL: string;
    if (imgMap.has(userName)) {
      newImageURL = imgMap.get(userName)!;
    } else {
      newImageURL = await catImageURL();
      imgMap.set(userName, newImageURL);
    }
    image.setAttribute('src', newImageURL);
  }
};

const userNameFromImage = (image: Element): string | null => {
  const altText = image.getAttribute('alt');
  if (altText === null || altText === '') {
    return null;
  }

  return altText.replace('@', '');
};

const catImageURL = async (): Promise<string> => {
  const response = await fetchAPI();
  const URL = response[0].url;
  return URL;
};

const theCatAPIRequestURL = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png';

type ImageData = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Response = ImageData[];

const fetchAPI = async (): Promise<Response> => {
  const response = await fetch(theCatAPIRequestURL);
  const json = await response.json();
  return json;
};
