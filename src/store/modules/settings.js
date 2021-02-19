import { Services } from "../../services";

const state = {
  refresh: Services.getTimerAPI() || 180000,
  idle: Services.getIdleTime() || 120000,
  optionRefresh: [
    { option: 1, label: "3 Menit", value: 180000 },
    { option: 2, label: "5 Menit", value: 300000 },
    { option: 3, label: "7 Menit", value: 420000 },
  ],
  intervalId: Services.getIntervalAPIId(),
};

const actions = {
  saveRefreshTime({ commit }, refreshTime) {
    Services.setTimerAPi(refreshTime);
    commit("set_timeApi", refreshTime);
  },
  intervalIdAPI({ commit }, id) {
    Services.setIntervalAPIId(id);
    commit("set_interval_id_api", id);
  },
  saveIdleTime({ commit }, time) {
    Services.setIdleTime(time);
    commit("set_idle_time", time);
  },
};
const mutations = {
  set_timeApi(state, time) {
    state.refresh = time;
  },
  set_interval_id_api(state, id) {
    state.intervalId = id;
  },
  set_idle_time(state, time) {
    state.idle = time;
  },
};
const getters ={
  getRefresh:(state) => state.refresh,
  getIntervalAPIId:(state) => state.intervalId
}

export const settings = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
