export const state = () => ({
  characters: [],
  results: [],
  pages: [],
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
  }
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

}

export const actions = {
  getCharacters ({ commit }) {
    return this.$axios.$get('/character').then((res) => {
      commit('setCharacters', res)
    })
  },
  getPages ({ commit }) {
    return this.$axios.$get('/character').then((res) => {
      commit('setPages', res.info.pages)
    })
  },
  getResults ({ commit }) {
    return this.$axios.$get('/character').then((res) => {
      commit('setResults', res.results)
    })
  }
  // characters ({commit},page) {
  //   return this.$axios.$get('/character?page=${page}').then((data) => {
  //     const {info, result} = data
  //     commit('setCharacters', {page, characters: result})
  //     commit('setPages', info.pages)
  //   })
  // }
}
