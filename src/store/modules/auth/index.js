import { ApiServices, Services } from "../../../services";
import router from "../../../router";
const state = {
  authenticating: false,
  messageError: "",
  accessToken: Services.getToken(),
  userProfile: Services.getUser(),
};
const actions = {
  async login({ commit }, user) {
    commit("auth_request");
    const requestLogin = {
      url: "login",
      data: user,
      method: "POST",
    };
    try {
      const response = await ApiServices.customRequest(
        requestLogin
      ).catch((err) => commit("auth_error", err));
      Services.saveToken(response.data.token);
      ApiServices.setHeader();
      const getProfile = await ApiServices.get("user/me").catch((err) => {
        Services.removeToken();
        ApiServices.removeHeader();
        commit("auth_error", err);
      });
      Services.saveProfile(getProfile.data.data.display_name);
      commit("auth_success", {
        token: Services.getToken(),
        user: Services.getUser(),
      });
      router.push({ name: "Dashboard" }, () => {});
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  closeMessageError({ commit }) {
    commit("empty_ErrorMessage");
  },
  logout({ commit }) {
    Services.removeToken();
    Services.removeProfile();
    ApiServices.removeHeader();
    let id = Services.getIntervalAPIId();
    console.log(id)
    clearInterval(id);
    clearInterval(id); 
    commit("logout");
    Services.removeIntervalAPIId();
    router.push({ name: "Login" }, () => {});
  },
};
const mutations = {
  auth_request(state) {
    state.authenticating = true;
  },
  auth_success(state, data) {
    const { user, token } = data;
    state.accessToken = token;
    state.userProfile = user;
    state.authenticating = false;
  },
  auth_error(state, resp) {
    state.messageError = resp.response.data.error || resp.response.data.message;
    state.authenticating = false;
  },
  logout(state) {
    state.accessToken = "";
    state.userProfile = "";
  },
  empty_ErrorMessage(state) {
    state.messageError = "";
  },
};
const getters = {
  isLoggedIn: (state) => {
    return state.accessToken ? true : false;
  },
  getUserProfile: (state) => state.userProfile,
  optionRefresh: (state) => state.optionRefresh,
  getRefresh: (state) => state.refresh,
};
export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
