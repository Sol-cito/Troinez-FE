import { GetParameter, getApiCall } from './restAPI.service';

export async function healthCheckAPI(): Promise<void> {
  const getParameter: GetParameter = {
    url: '/health',
    params: {},
  };
  return await getApiCall(getParameter);
}
