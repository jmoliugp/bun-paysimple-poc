import Axios from 'axios';

export enum Endpoints {
  GetCheckoutToken = '/getCheckoutToken',
}

export enum QueryKeys {
  CheckoutToken = 'CheckoutToken',
}

export type AxiosConfig = Record<string, unknown>;

const initHttpClient = () => {
  const axios = Axios.create({
    baseURL: 'http://localhost:8080/',
  });

  return { axios };
};

export const { axios } = initHttpClient();
