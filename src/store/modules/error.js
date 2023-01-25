const state = {
  error500: ''
}

const mutations = {
  SET_ERROR_500: (state, error500) => {
    state.error500 = error500
  }
}

const actions = {
  setError500({ commit, state, dispatch }, error) {
    commit('SET_ERROR_500', error)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
