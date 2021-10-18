<template>
  <div class="container">
    <div class="profile">
      <div class="profile__img">
        <img :src="results.image" :alt="results.name" class="profile__img">
      </div>
      <div class="profile__block-elem">
        <span class="profile__elem">Имя: {{ results.name }}</span>
        <span class="profile__elem">Разновидность: {{ results.species }}</span>
        <span class="profile__elem" v-if="results.location">Локация: {{ results.location.name }}</span>
      </div>
    </div>
    <button class="profile__btn"  @click="back()">Главное меню</button>
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
   this.$store.dispatch('character/getHero', this.id)
  },
  computed: {
    results () {
      return this.$store.getters['character/hero']
    },
    location () {
      return this.$store.getters['character/location']
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

.profile
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

