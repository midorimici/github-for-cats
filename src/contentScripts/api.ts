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

const sizeOption = ['small', 'med', 'full'];
const mimeTypesOption = ['png,jpg', 'gif'];

const randomChoice = (options: string[]): string => {
  const index = Math.floor(options.length * Math.random());
  return options[index];
};

const theCatAPIURL = 'https://api.thecatapi.com/v1/images/search';

const fetchAPI = async (queryParams: string): Promise<Response> => {
  const response = await fetch(`${theCatAPIURL}?${queryParams}`);
  const json = await response.json();
  return json;
};
