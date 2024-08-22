const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  BASE_URL: `${API_BASE_URL}`,
  NEWS_LIST: `${API_BASE_URL}/api/createNews/list`,
  NEWS_LIST_SEARCH: `${API_BASE_URL}/api/createNews/list/search`,
  NEWS_DETAIL: `${API_BASE_URL}/api/createNews/detail`,
  TREND_NEWS_LIST: `${API_BASE_URL}/api/createNews/trend/list`,
  UPDATE_NEWS_JOIND: `${API_BASE_URL}/api/createNews/joind/update`,
  UPDATE_NEWS_LOG: `${API_BASE_URL}/api/createNews/log/update`,
  ID_VALIDATION: `${API_BASE_URL}/api/user/validation/id`,
  EMAIL_VALIDATION: `${API_BASE_URL}/api/user/validation/email`,
  GET_LIKE: `${API_BASE_URL}/api/createNews/like/get`,
  GET_DISLIKE: `${API_BASE_URL}/api/createNews/dislike/get`,
  UPDATE_LIKE: `${API_BASE_URL}/api/createNews/like/update`,
  UPDATE_DISLIKE: `${API_BASE_URL}/api/createNews/dislike/update`,
  RELATED_NEWS_LIST: `${API_BASE_URL}/api/createNews/related/list`,
  MYPAGE: `${API_BASE_URL}/updateInterests`,
  SIGNIN: `${API_BASE_URL}/signin`,
  SIGNUP: `${API_BASE_URL}/signup`,
};

export default API_ENDPOINTS;
