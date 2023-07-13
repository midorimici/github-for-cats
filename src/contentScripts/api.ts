import { fetchFromStorage, type AnimalOption } from '~/lib/storage';

const maxTryCount = 5;

type ImageData = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Response = ImageData[];

export const catImageURLs = async (count: number, isAvatar: boolean): Promise<string[]> => {
  let queryParams: string;
  let response: Response = [];
  if (isAvatar) {
    queryParams = `limit=${count}&mime_types=png,jpg`;
    response = await fetchAPI(queryParams);
  } else {
    let needCount = count;
    for (let i = 0; i < maxTryCount; i++) {
      const size = randomChoice(sizeOption);
      const mimeTypes = randomChoice(mimeTypesOption);
      queryParams = `limit=${needCount}&size=${size}&mime_types=${mimeTypes}`;
      response = await fetchAPI(queryParams);
      if (response.length >= needCount) {
        break;
      }

      needCount = count - response.length;
    }
  }

  const URLs = response.map((img: ImageData) => img.url);
  return URLs;
};

const fetchAPI = async (queryParams: string): Promise<Response> => {
  const response = await fetch(`${randomChoice(APIURLs)}?${queryParams}`);
  const json = await response.json();
  return json;
};

const sizeOption = ['small', 'med', 'full'];
const mimeTypesOption = ['png,jpg', 'gif'];

const randomChoice = (options: string[]): string => {
  const index = Math.floor(options.length * Math.random());
  return options[index];
};

let animalOption: AnimalOption;

const fetchAnimalOption = async () => {
  const { animal } = await fetchFromStorage(['animal']);
  animalOption = animal;
};

const getAPIURLs = (): string[] => {
  const catAPI = 'https://api.thecatapi.com/v1/images/search';
  const dogAPI = 'https://api.thedogapi.com/v1/images/search';

  switch (animalOption) {
    case 'cat':
      return [catAPI];

    case 'dog':
      return [dogAPI];

    case 'both':
      return [catAPI, dogAPI];

    default:
      console.warn(`animal option is invalid: ${animalOption}`);
      return [catAPI];
  }
};

let APIURLs: string[];
fetchAnimalOption().then(() => {
  APIURLs = getAPIURLs();
});
