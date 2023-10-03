import { HttpMethod, SuccessOrNot } from '@/model/common.enum';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useTranslations } from 'next-intl';

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
    url: `/api/v1${props.url}`,
    method: props.method,
    data: props.data,
    params: props.params,
    headers: {
      Authorization: 'token', // TO-DO
    },
  };

  const axiosResponse: AxiosResponseModel = {
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
    let errorTitle: string = '[System Error]';
    let errorDescription: string =
      'Unexpected error occured. Please contact admin.';

    if (e?.response?.data?.errorPopupMessage) {
      errorDescription = e.response.data.errorPopupMessage
        .concat('\nStatus code : ')
        .concat(e.response.status);
    }

    const errorMessage: string = errorTitle
      .concat('\n')
      .concat(errorDescription);

    alert(errorMessage);
    axiosResponse.successOrNot = SuccessOrNot.N;
  }
  return axiosResponse;
}

export default baseApiCall;
