// Lấy giá trị từ môi trường (VITE_BASE_URL, NODE_ENV) thông qua process.env
// Nếu sử dụng Vite, giá trị này sẽ được thiết lập bởi Vite.
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const NODE_ENV = import.meta.env.NODE_ENV;
export const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';
export const CSRF_HEADER = 'X-CSRF-Token';
export const SAME_ORIGIN = 'same-origin';
export const CORS_MODE = 'cors';
export const ABORT_ERROR_STATUS = 499;
export const ABORT_ERROR_NAME = 'AbortError';
export const ABORT_ERROR_MESSAGE = 'Abort Error';

export const METHODS_WITH_CSRF_TOKEN = ['POST', 'PUT', 'PATCH'];
export const METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH'];

export const STATUS_UNAUTHORIZED = 401;
