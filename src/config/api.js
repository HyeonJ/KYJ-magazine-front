const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  BASE_URL: `${API_BASE_URL}`,
  NEWS_LIST: `${API_BASE_URL}/api/createNews/list`,
  NEWS_DETAIL: `${API_BASE_URL}/api/createNews/detail`,
  TREND_NEWS_LIST: `${API_BASE_URL}/api/createNews/trend/list`,
  UPDATE_NEWS_JOIND: `${API_BASE_URL}/api/createNews/joind/update`,
  ID_VALIDATION: `${API_BASE_URL}/api/user/validation/id`,
  EMAIL_VALIDATION: `${API_BASE_URL}/api/user/validation/email`,
  SIGNIN: `${API_BASE_URL}/signin`,
  SIGNUP: `${API_BASE_URL}/signup`,
};

export default API_ENDPOINTS;
