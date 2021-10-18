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
  },
  setCharacterImg (state, payload) {
    state.episode.characters[payload.c] = Object.assign({}, payload.res)
    Object.assign(state.episode.characters[payload.c], payload.res)
    state.episode.characters.splice()
  },
}

export const actions = {
  getEpisode ({ commit }, id) {
    return this.$axios.$get('/episode' +'/' + id).then((res) => {
      commit('setEpisode', res)
      const info = res
      for (let c = 0; c < info.characters.length; c++) {
        let url = info.characters[c]
        this.$axios.$get(url).then((res) => {
          commit('setCharacterImg', {c: c, res: res})
        })
      }
      commit('setEpisode', test)
    })
  }
}