export const state = () => ({
  characters: [],
  results: [],
  pages: [],
  hero: []
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
  
}

export const mutations = {
  setPage (state, payload) {
    state.page = payload
  },
  setCharacters (state, payload) {
    state.characters = payload
  },
  setResults (state, payload) {
    state.results = payload
  },
  setHero (state, payload) {
    state.hero = payload
  }

}

export const actions = {
  getCharacters ({ commit }, data) {
    return this.$axios.$get('/character', {params: data}).then((res) => {
      commit('setCharacters', res.data)
      commit('setResults', res.results)
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
  getEpisodeCharacter ({ commit }, data) {
    return this.$axios.$get('/character', {params: data}).then((res) => {
      return this.$axios.$get('/episode', {params: data}).then((res) => {

      })
    })
  }, 
  // getResults ({ commit }) {
  //   return this.$axios.$get('/character').then((res) => {
  //     commit('setResults', res.results)
  //   })
  // }
  // characters ({commit},page) {
  //   return this.$axios.$get('/character?page=${page}').then((data) => {
  //     const {info, result} = data
  //     commit('setCharacters', {page, characters: result})
  //     commit('setPages', info.pages)
  //   })
  // }
}
