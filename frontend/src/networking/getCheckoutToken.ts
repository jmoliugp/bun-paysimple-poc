import { Endpoints, axios } from "./axios";

type Response = Record<string, never>;

export const getCheckoutToken = async (): Promise<Response> => {
  const rawResponse = await axios.get<Response>(Endpoints.GetCheckoutToken);
  console.log("🚀 ~ auth ~ rawResponse:", rawResponse.data);

  return {};
};
