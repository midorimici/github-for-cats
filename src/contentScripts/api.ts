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
      const size = randomSize();
      const categoryID = randomCategoryID();
      queryParams = `limit=${needCount}&size=${size}&category_ids=${categoryID}`;
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

const fetchAPI = async (queryParams: string): Promise<Response> => {
  const response = await fetch(`${theCatAPIURL}?${queryParams}`);
  const json = await response.json();
  return json;
};
