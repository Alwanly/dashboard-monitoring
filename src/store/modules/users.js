"use strict";
import { ApiServices } from "../../services";

const state = {
  // data general users
  total_users: 0,
  active_users: 0,
  consumtive_users: null,
  agents: null,
  // data growth users
  data_users_per_os: null,
  options_user_per_os: null,
  data_topAgents_per_month: null,
  options_topAgents_per_month: null,
  data_active_users_per_month: null,
  options_active_users_per_month: null,
};

const actions = {
  async fetchGeneralUsers({ commit }) {
    commit("pre_general", null);
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
  async fetchGrowthUsers({ commit, dispatch }, last_month) {
    commit("pre_growth", null);
    try {
      const response = await ApiServices.get(
        `bi/users/growth?last_month=${last_month}`
      );
      const datas = response.data;
      dispatch("setUsersPerOS", datas.growth_usersBy_os);
      dispatch("setTopAgentsGrowth", datas.growth_agents);
      dispatch("setActiveUsersGrowth", datas.active_users);
    } catch (e) {
      return false;
    }
  },
  setActiveUsersGrowth({ commit }, rawData) {
    console.log(rawData);
    let labels = [],
      datas = [],
      options = [];
    labels = rawData.map((item) => item.label);
    datas = {
      labels,
      datasets: [
        {
          label: "Users",
          borderColor:
            "#" +
            (
              "000000" + Math.floor(Math.random() * 16777216).toString(16)
            ).substr(-6),
          data: rawData.map((item) => item.data),
        },
      ],
    };
    options = {
      title: {
        display: true,
        text: "Growth Active users",
        position: "top",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 1,
              callback: function(value) {
                if (value % 1 == 0) {
                  return value;
                }
              },
            },
          },
        ],
      },
    };
    commit("set_activeUsers_growth", { datas, options });
  },
  setUsersPerOS({ commit }, rawData) {
    let labels = [];
    let android = [];
    let ios = [];
    let colors = [
      "#" +
        ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(
          -6
        ),
      "#" +
        ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(
          -6
        ),
    ];
    rawData.map((item) => {
      labels.push(item.label);
      android.push(item.Android);
      ios.push(item.IOS);
    });
    const datas = {
      labels,
      datasets: [
        {
          label: "Android",
          data: android,
          borderColor: colors[0],
        },
        {
          label: "IOS",
          data: ios,
          borderColor: colors[1],
        },
      ],
    };
    const options = {
      title: {
        display: true,
        text: "Growth of Android and IOS users",
        position: "top",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 1,
              callback: function(value) {
                if (value % 1 == 0) {
                  return value;
                }
              },
            },
          },
        ],
      },
    };
    commit("set_usersPer_os", { datas, options });
  },
  setTopAgentsGrowth({ commit }, rawData) {
    let labels = [],
      agents = [];
    labels = rawData[0].data.map((item) => item.label);
    rawData.map((item) => {
      let agent = {
        label: item.display_name,
        borderColor:
          "#" +
          ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(
            -6
          ),
        data: item.data.map((data) => data.data),
      };
      agents.push(agent);
    });
    let datas = [],
      options = [];
    datas = {
      labels,
      datasets: agents,
    };
    options = {
      title: {
        display: true,
        text: "Growth of Android and IOS users",
        position: "top",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 1,
              callback: function(value) {
                if (value % 1 == 0) {
                  return value;
                }
              },
            },
          },
        ],
      },
    };
    commit("set_topAgents_growth", { datas, options });
  },
};
const mutations = {
  pre_general(state, prefetch) {
    state.total_users = prefetch;
    state.active_users = prefetch;
    state.consumtive_users = prefetch;
    state.agents = prefetch;
  },
  pre_growth(state, prefetch) {
    state.data_users_per_os = prefetch;
    state.options_user_per_os = prefetch;
    state.data_topAgents_per_month = prefetch;
    state.options_topAgents_per_month = prefetch;
    state.data_active_users_per_month = prefetch;
    state.options_active_users_per_month = prefetch;
  },
  set_usersPer_os(state, datasets) {
    state.data_users_per_os = datasets.datas;
    state.options_user_per_os = datasets.options;
  },
  set_topAgents_growth(state, datasets) {
    state.data_topAgents_per_month = datasets.datas;
    state.options_topAgents_per_month = datasets.options;
  },
  set_activeUsers_growth(state, datasets) {
    state.data_active_users_per_month = datasets.datas;
    state.options_active_users_per_month = datasets.options;
  },
  set_general(state, general) {
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
      agents: state.agents,
    };
  },
  getGrowth: (state) => {
    return {
      overall_growth_usersOs: {
        data: state.data_users_per_os,
        options: state.options_user_per_os,
      },
      top_agents_growth: {
        data: state.data_topAgents_per_month,
        options: state.options_topAgents_per_month,
      },
      active_users_growth:{
        data:state.data_active_users_per_month,
        options:state.options_active_users_per_month
      }
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
