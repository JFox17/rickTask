export const state = () => ({
  episode: []
})

export const getters = {
  episode: (state) => {
    return state.episode
  }
}

export const mutations = {
  setEpisode (state, payload) {
    state.episode = payload
  }
}

export const actions = {
  getEpisode ({ commit }, data) {
    return this.$axios.$get('/episode', {params: data}).then((res) => {
      commit('setEpisode', res.data)
    })
  }
}