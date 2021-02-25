import { ApiServices } from "../../services";

const state = {
  total_users: 0,
  active_users: 0,
  consumtive_users: null,
  agents: null,
};

const actions = {
  async fetchGeneralUsers({ commit }) {
    try {
      const response = await ApiServices.get("bi/users/general");

      const data = {
        total_users: response.data.total_users,
        active_users: response.data.active_users,
        consumtive_users: response.data.consumtive_users,
        agent_users: response.data.agent_users,
      };
      commit("set_general", data);
      return true;
    } catch (e) {
      return false;
    }
  },
};
const mutations = {
  set_general(state, general) {
    console.log(general);
    state.total_users = general.total_users;
    state.active_users = general.active_users;
    state.consumtive_users = general.consumtive_users;
    state.agents = general.agent_users;
  },
};
const getters = {
  getGeneral: (state) => {
    return {
      total_users: state.total_users,
      active_users: state.active_users,
      consumtive_users: state.consumtive_users,
      agents:state.agents
    };
  },
};

export const users = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
