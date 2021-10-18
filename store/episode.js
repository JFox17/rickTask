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
    console.log(state.episode)
  },
  setTest (state, payload) {
    state.episode.characters[payload.c] = Object.assign({}, payload.res)
    Object.assign(state.episode.characters[payload.c], payload.res)
    state.episode.splice()
  },
}

export const actions = {
  getEpisode ({ commit }, id) {
    return this.$axios.$get('/episode' +'/' + id).then((res) => {
      commit('setEpisode', res)
      const test = res
      // for (let i = 0; i < test.length; i++) {
        for (let c = 0; c < test.characters.length; c++) {
          let url = test.characters[c]
          this.$axios.$get(url).then((res) => {
            console.log(res)
            commit('setTest', {c: c, res: res})
          })
        }
      // }
      commit('setEpisode', test)
    })
  }
}