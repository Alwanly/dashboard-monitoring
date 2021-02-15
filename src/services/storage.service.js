const TOKEN_KEY = "access_token";
const AUTH_PROFILE = "profile_user";
const INTERVAL_API_ID = "interval_api_id";
const INTERVAL_API_TIME = "interval_api_time";
const IDLE_TIME = "idle_time";
const Services = {
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  },
  saveToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  },
  removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  },
  getUser() {
    return sessionStorage.getItem(AUTH_PROFILE);
  },
  saveProfile(user) {
    sessionStorage.setItem(AUTH_PROFILE, user);
  },
  removeProfile() {
    sessionStorage.removeItem(AUTH_PROFILE);
  },
  setIntervalAPIId(intervalId) {
    sessionStorage.setItem(INTERVAL_API_ID, intervalId);
  },
  removeIntervalAPIId() {
    sessionStorage.removeItem(INTERVAL_API_ID);
  },
  getIntervalAPIId() {
    return sessionStorage.getItem(INTERVAL_API_ID);
  },
  setTimerAPi(time) {
    sessionStorage.setItem(INTERVAL_API_TIME, time);
  },
  getTimerAPI() {
    return sessionStorage.getItem(INTERVAL_API_TIME);
  },
  setIdleTime(time) {
    sessionStorage.setItem(IDLE_TIME, time);
  },
  getIdleTime() {
    return sessionStorage.getItem(IDLE_TIME);
  },
};

export default Services;
