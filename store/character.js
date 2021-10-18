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
    // console.log(state.results)
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
    // state.results = test
    for (let i = 0; i < test.length; i++) {
      for (let b = 0; b < test[i].episode.length; b++) {
        let url = test[i].episode[b]
        this.$axios.$get(url).then((res) => {
            test[i].episode[b] = res
        })
      }
    }
    console.log(test)
    state.results = test
    // state.results = state.results.splice(state.results.length)
    // console.log(state.results)
    // state.results = test
    
    // console.log(test)
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
  },
  // getEpisode ({ commit }) {
  //   return this.$axios.$get('/episode').then((res) => {
  //     commit('setTest', res.results)
  //   })
  // },
}
