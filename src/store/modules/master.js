import { fetch } from '@/api/master'

const state = {
}

const mutations = {
}

const actions = {
  // fetch resource
  fetch({ commit }, resource) {
    return new Promise((resolve, reject) => {
      fetch(resource).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
