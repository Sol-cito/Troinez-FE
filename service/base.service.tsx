import { HttpMethod, SuccessOrNot } from '@/model/common.enum';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosResponseModel {
  successOrNot: string;
  statusCode: number;
  data: any;
}

export interface BaseApiCallProps {
  url: string;
  method: HttpMethod;
  params?: any;
  data?: any;
}

async function baseApiCall(
  props: BaseApiCallProps
): Promise<AxiosResponseModel> {
  const requestConfig: AxiosRequestConfig = {
    url: '/api' + props.url,
    method: props.method,
    data: props.data,
    params: props.params,
    headers: {
      Authorization: 'token', // TO-DO
    },
  };

  let axiosResponse: AxiosResponseModel = {
    successOrNot: SuccessOrNot.Y,
    statusCode: 200,
    data: undefined,
  };

  try {
    const response: AxiosResponse<any> = await axios.request(requestConfig);
    if (response.status !== 200) {
      throw new Error('Api request fail');
    }
    axiosResponse.statusCode = response.status;
    axiosResponse.data = response.data;
  } catch (e: any) {
    alert(e); // TO-DO : 별도 pop-up 만들기
    axiosResponse.successOrNot = SuccessOrNot.N;
  }
  return axiosResponse;
}

export default baseApiCall;