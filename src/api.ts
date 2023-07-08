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

export const catImageURL = async (isGIF: boolean): Promise<string> => {
  let queryParams: string;
  if (isGIF) {
    queryParams = 'mime_types=gif&size=small';
  } else {
    queryParams = 'mime_types=png,jpg';
  }

  const response = await fetchAPI(queryParams);
  const URL = response[0].url;
  return URL;
};
