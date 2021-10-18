<template>
  <div class="container">
    <div class="episode">
        <div class="episode__block-elem">
          <span class="episode__elem">Название: {{ episode.name }}</span>
          <span class="episode__elem">Дата премьеры: {{ episode.created }}</span>
        </div>
        <div
          v-for="(characters, index) in episode.characters"
          :key="index"
          class="episode__img"
        >
          {{ characters }}
        <!-- <img :src="result.image" :alt="result.name" class="episode__img"> -->
        </div>
    </div>
    {{ $store.getters['episode/episode']}}
    <button class="episode__btn"  @click="back()">Главное меню</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      page: 1
    }
  },
  mounted () {
   this.$store.dispatch('episode/getEpisode', this.id)
  },
  computed: {
    episode () {
      return this.$store.getters['episode/episode']
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/', query: {page: this.page}})
    }
  },
}
</script>

<style scoped lang="sass">
.container
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  background: rgb(32, 35, 41)
  max-width: 1440px
  font-family: Arial
  height: 100vh
  font-weight: bold

.episode
  color: black
  display: flex
  justify-content: space-around
  @media(max-width: 450px)
    flex-direction: column

  &__block-elem
    display: flex
    justify-content: space-around
    flex-direction: column
    align-items: center
    margin-left: 30px

  &__elem
    color: whitesmoke
    font-size: 18px
  
  &__img
    max-width: 250px
    border-radius: 15px

  &__btn
    margin: 21px 0
    padding: 15px 10px
    background: #3b3e43
    color: whitesmoke
    font-size: 16px
    font-weight: bold
    border-radius: 7px
</style>

