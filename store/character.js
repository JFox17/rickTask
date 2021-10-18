export const state = () => ({
  characters: [],
  results: [],
  pages: [],
  hero: [],
  test: [],
  episodeCharacter: null
})

export const getters = {
  characters: (state) => {
    return state.characters
  },
  pages: (state) => {
    return state.pages
  },
  results: (state) => {
    return state.results
  },
  hero: (state) => {
    return state.hero
  },
  episodeCharacter: (state) => {
    return state.episodeCharacter
  },
  test: (state) => {
    return state.test
  },

}

export const mutations = {
  setPage (state, payload) {
    state.page = payload
  },
  setCharacters (state, payload) {
    state.characters = payload
  },
  setResults (state, payload) {
    const test = payload
    state.results = test
  },
  setTest (state, payload) {
    state.results[payload.i].episode[payload.b] = Object.assign({}, payload.res)
    Object.assign(state.results[payload.i].episode[payload.b], payload.res)
    state.results.splice()
  },
  setHero (state, payload) {
    state.hero = payload
  },
  setEpisodeCharacter(state, payload) {
    state.episodeCharacter = payload
  },
}

export const actions = {
  getCharacters ({ commit }, data) {
    return this.$axios.$get('/character', {params: data}).then((res) => {
      commit('setResults', res.results)
      const test = res.results
      for (let i = 0; i < test.length; i++) {
        for (let b = 0; b < test[i].episode.length; b++) {
          let url = test[i].episode[b]
          this.$axios.$get(url).then((res) => {
            commit('setTest', {i: i, b: b, res: res})
          })
        }
      }
      // console.log(test)
      commit('setResults', test)
    })
  },
  getHero ({ commit }, id) {
    return this.$axios.$get('/character' +'/' + id).then((res) => {
      commit('setHero', res)
    })
  },
  getPages ({ commit }) {
    return this.$axios.$get('/character').then((res) => {
      commit('setPages', res.info.pages)
    })
  },
  getEpisodeCharacter ({ commit }, url) {
    return this.$axios.$get(url).then((res) => {
      commit('setEpisodeCharacter', res)
    })
  }
}
