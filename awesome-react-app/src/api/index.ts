import { ApiRequest, ApiResponse } from '../models';

const urls = {
  fetchData: 'https://jsonplaceholder.typicode.com/posts',
};

const api = {
  fetchData: async (args: ApiRequest): Promise<ApiResponse> => {
    try {
      const response = await fetch(urls.fetchData);
      const apiData = await response.json();
      return apiData;
    } catch (err) {
      return err as any;
    }
  },
  anotherAction: async (args: ApiRequest): Promise<ApiResponse> => {
    try {
      const response = await fetch(urls.fetchData);
      const apiData = await response.json();
      return apiData;
    } catch (err) {
      return err as any;
    }
  },
};

export default api;
