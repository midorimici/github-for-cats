const theCatAPIURL = 'https://api.thecatapi.com/v1/images/search';

type ImageData = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Response = ImageData[];

const fetchAPI = async (mimeTypes: string): Promise<Response> => {
  const response = await fetch(`${theCatAPIURL}?mime_types=${mimeTypes}`);
  const json = await response.json();
  return json;
};

export const catImageURL = async (isGIF: boolean): Promise<string> => {
  const mimeTypes = isGIF ? 'gif' : 'jpg,png';
  const response = await fetchAPI(mimeTypes);
  const URL = response[0].url;
  return URL;
};
