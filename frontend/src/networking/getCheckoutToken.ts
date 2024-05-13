import { Endpoints, axios } from './axios';

interface ResponseToken {
  message: string;
  token: string;
  success: boolean;
}

export const getCheckoutToken = async (): Promise<string> => {
  const rawResponse = await axios.get<ResponseToken>(
    Endpoints.GetCheckoutToken
  );

  return rawResponse.data.token;
};
