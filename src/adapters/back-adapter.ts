import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { env } from './environmentConfigs';
import { ApiError, ApiUploadError } from '../models/apiError';
import { ContentType, ERROR_CODE } from '../utils/enum/commonEnum';
import { getAccessToken, removeAccessToken } from './sessionStore';
import i18next from 'i18next';

const defaultForJSON = ContentType.JSON;
const defaultTimeout = env.backEnd.timeout;
let contentType: string;
let timeout: number = env.backEnd.timeout;

const msgTimeout = i18next.t('error:timeout');
const instance = axios.create({
  baseURL: env.backEnd.url,
  timeout: env.backEnd.timeout,
  headers: {
    'Content-Type': defaultForJSON,
  },
});

instance.interceptors.request.use(function (
  config: InternalAxiosRequestConfig
) {
  const token = getAccessToken();
  // config.headers.common['x-trace'] = getSessionId();
  // config.headers.common['branch'] = getUserInfo().branch;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  // config.headers.common['Content-Type'] = contentType
  //   ? contentType
  //   : defaultForJSON;
  config.timeout = timeout;
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      removeAccessToken();
      window.location.reload();
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export function get(
  path: string,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;

  return instance
    .get(path)
    .then((result: any) => {
      if (result.status === 200) {
        return result.data;
      } else if (result.status === 204) {
        return result.status;
      }
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message
      );
    });
}

export function getFile(
  path: string,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;

  return instance
    .get(path, {
      responseType: 'blob',
    })
    .then((result: any) => {
      if (result.status === 200) {
        return result;
      }
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message
      );
    });
}

export function getParams(
  path: string,
  payload: any,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;
  return instance
    .get(path, {
      params: payload,
    })
    .then((response: AxiosResponse) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw new ApiError(response.status, response.status, response.statusText);
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message
      );
    });
}

export function post(
  path: string,
  payload?: any,
  contentType = defaultForJSON,
  actionType?: string,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;
  return instance
    .post(path, payload)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      if (actionType === 'Upload') {
        throw new ApiUploadError(
          error.response?.status,
          error.response?.data.code,
          error.response?.data.message,
          error.response?.data.data
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message,
        error.response?.data.error_details,
        error.response?.data.data
      );
    });
}

export function put(
  path: string,
  payload: any,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;
  return instance
    .put(path, payload)
    .then((response: AxiosResponse) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw new ApiError(response.status, response.status, response.statusText);
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message,
        error.response?.data.error_details
      );
    });
}

export function putData(
  path: string,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;
  return instance
    .put(path)
    .then((response: AxiosResponse) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw new ApiError(response.status, response.status, response.statusText);
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message
      );
    });
}

export function deleteData(
  path: string,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;
  return instance
    .delete(path)
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message
      );
    });
}

export function deleteDataBody(
  path: string,
  payload: any,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;
  return instance
    .delete(path, { data: payload })
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message
      );
    });
}

export function postFile(
  path: string,
  payload: any,
  contentType = defaultForJSON,
  overrideTimeOut = defaultTimeout
) {
  timeout = overrideTimeOut;

  return instance
    .post(path, payload, {
      responseType: 'blob',
    })
    .then((result: any) => {
      if (result.status === 200) {
        return result;
      }
    })
    .catch((error: any) => {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError(
          error.response?.status,
          ERROR_CODE.TIME_OUT,
          msgTimeout
        );
      }
      throw new ApiError(
        error.response?.status,
        error.response?.data.code,
        error.response?.data.message
      );
    });
}
