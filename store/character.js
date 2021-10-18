export const state = () => ({
  results: [],
  hero: []
})

export const getters = {
  results: (state) => {
    return state.results
  },
  hero: (state) => {
    return state.hero
  }

}

export const mutations = {
  setResults (state, payload) { 
    state.results = payload
  },
  setEpisodeName (state, payload) {
    if (state.results[payload.i].episode !== undefined) {
      state.results[payload.i].episode[payload.b] = Object.assign({}, payload.res)
      Object.assign(state.results[payload.i].episode[payload.b], payload.res)
      state.results.splice()
    }
  },
  setHero (state, payload) {
    state.hero = payload
  }
}

export const actions = {
  getCharacters ({ commit }, data) {
    return this.$axios.$get('/character', {params: data}).then((res) => {
      commit('setResults', res.results)
      const info = res.results
      for (let i = 0; i < info.length; i++) {
        for (let b = 0; b < info[i].episode.length; b++) {
          let url = info[i].episode[b]
          this.$axios.$get(url).then((res) => {
            commit('setEpisodeName', {i: i, b: b, res: res})
          })
        }
      }
      commit('setResults', info)
    })
  },
  getHero ({ commit }, id) {
    return this.$axios.$get('/character' +'/' + id).then((res) => {
      commit('setHero', res)
    })
  }
}
