export const catImageURL = async (isAvatar: boolean): Promise<string> => {
  let queryParams: string;
  if (isAvatar) {
    queryParams = 'mime_types=png,jpg';
  } else {
    const size = randomSize();
    const categoryID = randomCategoryID();
    queryParams = `size=${size}&category_ids=${categoryID}`;
  }

  const response = await fetchAPI(queryParams);
  const URL = response[0].url;
  return URL;
};

const sizeOption = ['small', 'med', 'full'] as const;

const randomSize = (): (typeof sizeOption)[number] => {
  const index = Math.floor(3 * Math.random());
  return sizeOption[index];
};

const availableCategoryIDs = [1, 4, 5, 7, 14, 15];
const categoryIDCount = availableCategoryIDs.length;

const randomCategoryID = (): number => {
  const index = Math.floor(categoryIDCount * Math.random());
  return availableCategoryIDs[index];
};

const theCatAPIURL = 'https://api.thecatapi.com/v1/images/search';

type ImageData = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Response = ImageData[];

const fetchAPI = async (queryParams: string): Promise<Response> => {
  const response = await fetch(`${theCatAPIURL}?${queryParams}`);
  const json = await response.json();
  return json;
};
