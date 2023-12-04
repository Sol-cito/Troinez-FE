/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpMethod } from '@/model/common.enum';
import baseApiCall, {
  AxiosResponseModel,
  BaseApiCallProps,
} from './base.service';

export interface GetParameter {
  url: string;
  params?: any;
}

export interface PostParameter {
  url: string;
  data?: any;
}

export interface PutParameter {
  url: string;
  data?: any;
}

export interface DeleteParameter {
  url: string;
  params?: any;
}

export async function getApiCall(getParameter: GetParameter): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: getParameter.url,
    method: HttpMethod.GET,
    params: getParameter.params,
  };
  const result: AxiosResponseModel = await baseApiCall(baseApiCallProps);
  return result.data;
}

export async function postApiCall(postParameter: PostParameter): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: postParameter.url,
    method: HttpMethod.POST,
    data: postParameter.data,
  };
  const result: AxiosResponseModel = await baseApiCall(baseApiCallProps);
  return result.data;
}

export async function putApiCall(putParameter: PutParameter): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: putParameter.url,
    method: HttpMethod.PUT,
    data: putParameter.data,
  };
  const result: AxiosResponseModel = await baseApiCall(baseApiCallProps);
  return result.data;
}

export async function deleteApiCall(
  deleteParameter: DeleteParameter
): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: deleteParameter.url,
    method: HttpMethod.DELETE,
    params: deleteParameter.params,
  };
  const result: AxiosResponseModel = await baseApiCall(baseApiCallProps);
  return result.successOrNot === 'Y';
}
