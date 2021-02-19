import { ApiServices } from "../../../services";
const state = {
  new_user_this_month: 0,
  total_users: 0,
  users_active: 0,
  monthly_visit: 0,
  monthly_transaction: 0,
  users_locations: null,
  data_chart_user_type: null,
  data_chart_mobile_version: null,
  data_chart_mobile_type: null,
  option_chart_user_type: null,
  option_chart_mobile_version: null,
  option_chart_mobile_type: null,
  lastactive_user: null,
};

const actions = {
  async fetchTotalUsers({ commit }) {
    try {
      const response = await ApiServices.get("users/total");
      commit("set_totalUsers", response.data.total_user);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchUsersActive({ commit }) {
    try {
      const response = await ApiServices.get("users/aktif");
      commit("set_usersActive", response.data.total_user_aktif);
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchMonthlyVisit({ commit }) {
    try {
      const response = await ApiServices.get("users/visitor");
      commit("set_monthVisit", response.data.user_visit);
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchMonthlyTransaction({ commit }) {
    try {
      const response = await ApiServices.get("users/transaction");
      commit("set_monthTransaction", response.data.this_month_total);
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchUsersLocation({ commit }) {
    try {
      const response = await ApiServices.get("users/location");
      commit("set_usersLocation", response.data.data);
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchMobileAppVersion({ commit }) {
    try {
      const response = await ApiServices.get("users/mobile/app");
      const datas = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: response.data.data,
      };
      const options = {
        title: {
          display: true,
          text: "Mobile App Version Installed In " + new Date().getFullYear(),
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
      commit("set_ChartMobileAppVersion", { datas, options });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchLastActiveUsers({ commit }) {
    try {
      const response = await ApiServices.get("users/aktivitas");
      commit("set_lastactive_user", response.data.data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchUsersType({ commit }) {
    try {
      const response = await ApiServices.get("users/type");
      const datas = {
        labels: ["New User", "Existing User"],
        datasets: [
          {
            data: [response.data.new_user, response.data.exiting_user],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.2)",
            ],
          },
        ],
      };
      const options = {
        legend: {
          position: "bottom",
        },
        plugins: {
          datalabels: {
            color: "#0f0f0f",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16,
            },
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += data;
              });
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      };
      commit("set_ChartUserType", {
        datas,
        options,
        new_user: response.data.new_user,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async fetchMobileType({ commit }) {
    try {
      const response = await ApiServices.get("users/mobile/usage");
      const datas = {
        labels: [response.data.data[0].os, response.data.data[1].os],
        datasets: [
          {
            data: [
              response.data.data[0].total_user,
              response.data.data[1].total_user,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.2)",
            ],
          },
        ],
      };
      const options = {
        legend: {
          position: "bottom",
        },
        plugins: {
          datalabels: {
            color: "#0f0f0f",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16,
            },
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += data;
              });
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      };
      commit("set_chartMobileType", { datas, options });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
const mutations = {
  set_totalUsers(state, data) {
    state.total_users = data;
  },
  set_usersActive(state, data) {
    state.users_active = data;
  },
  set_monthVisit(state, data) {
    state.monthly_visit = data;
  },
  set_monthTransaction(state, data) {
    state.monthly_transaction = data;
  },
  set_usersLocation(state, data) {
    state.users_locations = data;
  },
  set_ChartMobileAppVersion(state, record) {
    state.data_chart_mobile_version = record.datas;
    state.option_chart_mobile_version = record.options;
  },
  set_lastactive_user(state, data) {
    state.lastactive_user = data;
  },
  set_ChartUserType(state, record) {
    state.new_user_this_month = record.new_user;
    state.data_chart_user_type = record.datas;
    state.option_chart_user_type = record.options;
  },
  set_chartMobileType(state, record) {
    state.data_chart_mobile_type = record.datas;
    state.option_chart_mobile_type = record.options;
  },
};
const getters = {
  getTotalUsers: (state) => state.total_users,
  getUsersActive: (state) => state.users_active,
  getMonthlyVisit: (state) => state.monthly_visit,
  getMonthlyTransaction: (state) => state.monthly_transaction,
  getLastActiveUsers: (state) => state.lastactive_user,
  getUsersLocation: (state) => state.users_locations,
  getChartMobileAppVersion: (state) => {
    return {
      datas: state.data_chart_mobile_version,
      options: state.option_chart_mobile_version,
    };
  },
  getChartUsersType: (state) => {
    return {
      datas: state.data_chart_user_type,
      options: state.option_chart_user_type,
    };
  },
  getChartMobileType: (state) => {
    return {
      datas: state.data_chart_mobile_type,
      options: state.option_chart_mobile_type,
    };
  },
  getNewUsersThisMonth: (state) => state.new_user_this_month,
};

export const dashboard = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
