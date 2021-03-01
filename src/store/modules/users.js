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
  //data users locations
  oleh_oleh_users_locations: null,
  umroh_users_locations: null,
  zakat_users_locations: null,
  paket_data_users_locations: null,
  news_users_locations: null,
  agents_locations: null,
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
  async fetchUsersLocations({ commit }) {
    commit("pre_usersLocations", null);
    const url = "bi/users/location/service/";
    try {
      const res_umroh = await ApiServices.get(`${url}umroh`);
      const res_oleholeh = await ApiServices.get(`${url}oleh-oleh`);
      const res_news = await ApiServices.get(`${url}news`);
      const res_paket_data = await ApiServices.get(`${url}paket_data`);
      const res_agents = await ApiServices.get("bi/users/location/agents");
      const res_zakat = await ApiServices.get(`${url}zakat`);
      let data = {
        res_agents,
        res_news,
        res_oleholeh,
        res_paket_data,
        res_umroh,
        res_zakat,
      };
      commit("set_usersLocations", data);
      return true;
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
        text: "Top 10 Agents Growth",
        position: "top",
      },
      legend: {
        // display:false,
        position: "left",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              // max:1000,
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
  pre_usersLocations(state, prefetch) {
    state.oleh_oleh_users_locations = prefetch;
    state.umroh_users_locations = prefetch;
    state.zakat_users_locations = prefetch;
    state.paket_data_users_locations = prefetch;
    state.news_users_locations = prefetch;
    state.agents_locations = prefetch;
  },
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
  set_usersLocations(state, usersLocations) {
    console.log(usersLocations);
    state.oleh_oleh_users_locations = usersLocations.res_oleholeh.data.data;
    state.umroh_users_locations = usersLocations.res_umroh.data.data;
    state.zakat_users_locations = usersLocations.res_zakat.data.data;
    state.paket_data_users_locations = usersLocations.res_paket_data.data.data;
    state.news_users_locations = usersLocations.res_news.data.data;
    state.agents_locations = usersLocations.res_agents.data.data;
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
      active_users_growth: {
        data: state.data_active_users_per_month,
        options: state.options_active_users_per_month,
      },
    };
  },
  getUsersLocations: (state) => {
    return {
      oleh_oleh: state.oleh_oleh_users_locations,
      umroh: state.umroh_users_locations,
      paket_data: state.paket_data_users_locations,
      zakat: state.zakat_users_locations,
      news: state.news_users_locations,
      agents: state.agents_locations,
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
