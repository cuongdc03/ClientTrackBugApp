import {
  METHODS_WITH_CSRF_TOKEN,
  METHODS_WITH_BODY,
  CONTENT_TYPE_JSON,
  CSRF_HEADER,
  SAME_ORIGIN,
  BASE_URL,
  ABORT_ERROR_NAME,
  ABORT_ERROR_STATUS,
  ABORT_ERROR_MESSAGE
} from '../../constants/httpConstants';
import { toast } from 'react-toastify';

const ABORT_REQUEST_CONTROLLERS = new Map();

export const request = (method) => async (url, { query, body = {}, headers, signalKey, _csrf = '', ...rest } = {}) => {
  const addCSRFToken = METHODS_WITH_CSRF_TOKEN.includes(method);
  const addBody = METHODS_WITH_BODY.includes(method);
  const fullUrl = `${BASE_URL}${url}`;
  try {
    const response = await fetch(getUrlPathWithQuery({ url: fullUrl, query }), {
      method,
      mode: 'cors', 
      headers: {
        'Content-Type': CONTENT_TYPE_JSON,
        ...(addCSRFToken && { [CSRF_HEADER]: _csrf }),
        ...headers
      },
      credentials: SAME_ORIGIN,
      ...(signalKey && { signal: abortAndGetSignalSafe(signalKey) }),
      ...(addBody && { body: JSON.stringify(body) }),
      ...rest
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const customFetch = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

export const getUrlPathWithQuery = ({ url: partialUrl, query = {} } = {}) => {
  try {
    const url = new URL(partialUrl);
    const searchParams = new URLSearchParams({
      ...Object.fromEntries(url.searchParams),
      ...query
    });
    console.log(searchParams)
    return `${partialUrl.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  } catch (error) {
    console.error('Invalid URL:', partialUrl);
    throw error;
  }
};

const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    const errorText = await response.text();
    const errorData = errorText ? JSON.parse(errorText) : {};
    return Promise.reject(errorData);
  }
};

const abortRequestSafe = (key, reason = ABORT_ERROR_NAME) => {
  ABORT_REQUEST_CONTROLLERS.get(key)?.abort?.(reason);
};

const abortAndGetSignalSafe = (key) => {
  abortRequestSafe(key);
  const newController = new AbortController();
  ABORT_REQUEST_CONTROLLERS.set(key, newController);
  return newController.signal;
};

const handleError = (error) => {
  const isAbortError = error === ABORT_ERROR_NAME;

  return Promise.reject(
    isAbortError
      ? {
          status: ABORT_ERROR_STATUS,
          message: ABORT_ERROR_MESSAGE
        }
      : error
  );
};

export const showError = (error) => {
  if (!isAbortError(error)) {
    toast.error(error.message);
  }
};

export const isAbortError = (error) => {
  return error.status === ABORT_ERROR_STATUS;
};
