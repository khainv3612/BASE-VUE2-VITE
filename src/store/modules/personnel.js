const state = {
  personalInformation: {},
  socialNetwork: {},
  workEducation: {},
  bankAccount: {}
}

const mutations = {
  setPersonalInformation: (state, data) => {
    state.personalInformation = data
  },
  setSocialNetwork: (state, data) => {
    state.socialNetwork = data
  },
  setWorkEducation: (state, data) => {
    state.workEducation = data
  },
  setBankAccount: (state, data) => {
    state.bankAccount = data
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
