<template>
  <div class="container">
    <div class="episode">
      <div class="episode__block-elem">
        <span class="episode__elem">Название: {{ episode.name }}</span>
        <span class="episode__elem">Дата премьеры: {{ episode.air_date }}</span>
        <button class="episode__btn" @click="back()">Главное меню</button>
      </div>
      <div class="episode__wrap">
        <div
          v-for="(characters, index) in episode.characters"
          :key="index"
          class="episode__elem-dop"
          @click="routeToCharacter(episode.id)"
        >
          <img :src="characters.image" class="episode__img" v-if="characters.image">
        </div>
      </div>
    </div>
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
    },
    routeToCharacter(id) {
      this.$router.push({ path: `/character/${id}`})
    },
  },
}
</script>

<style scoped lang="sass">
.container
  background: rgb(32, 35, 41)
  max-width: 1440px
  font-family: Arial
  font-weight: bold

.episode
  color: black
  display: flex
  flex-direction: column
  align-item: center


  &__block-elem
    display: flex
    justify-content: space-around
    flex-direction: column
    align-items: center
    margin-left: 30px
    margin-top: 20px

  &__elem
    color: whitesmoke
    font-size: 25px
    line-height: 40px

  &__elem-dop
    cursor: pointer

  &__wrap
    margin-top: 20px
    display: flex
    flex-wrap: wrap
    justify-content: space-around
  
  &__img
    max-width: 250px
    border-radius: 15px
    margin: 10px

  &__btn
    margin: 21px 0
    padding: 15px 10px
    background: #3b3e43
    color: whitesmoke
    font-size: 16px
    font-weight: bold
    border-radius: 7px
    display: block
</style>

