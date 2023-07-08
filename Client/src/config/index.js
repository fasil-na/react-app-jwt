import { httpService } from "./httpService";

export const get = (url) => {
  return httpService.get(url).then((response) => response.data);
};

export const post = (url, data) => {
  return httpService.post(url, data).then((response) => response.data);
};

export const put = (url, data) => {
  return httpService.put(url, data).then((response) => response.data);
};

export const remove = (url) => {
  return httpService.delete(url).then((response) => response.data);
};
