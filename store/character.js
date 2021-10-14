export const state = () => ({
  results: [],
  characters: [],
})

export const getters = {
  characters: (state) => {
    return state.characters
  },
  results: (state) => {
    return state.results
  }
}

export const mutations = {
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
      commit('setCharacters', res.info.pages)
    })
  },
  getResults ({ commit }) {
    return this.$axios.$get('/results').then((res) => {
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
