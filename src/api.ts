export const catImageURL = async (isGIF: boolean): Promise<string> => {
  let queryParams: string;
  if (isGIF) {
    queryParams = 'mime_types=gif&size=small&category_ids=1,2,4,5,7,14,15';
  } else {
    queryParams = 'mime_types=png,jpg';
  }

  const response = await fetchAPI(queryParams);
  const URL = response[0].url;
  return URL;
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
