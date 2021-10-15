<template>
  <div class="container">
    <div class="profile">
      <div class="profile__img">
        <img :src="results.image" :alt="results.name" class="profile__img">
      </div>
      <span class="profile__elem">{{ results.name }}</span>
      <span class="profile__elem">{{ results.status }}</span>
      <span class="profile__elem">{{ results.location.name }}</span>
    </div>
  </div>
</template>
<script>
// import characterBlock from '../../components/CharacterBlock.vue'
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  // props: {
  //   result: {
  //     type: Object,
  //     required: true
  //   }
  // },
  mounted () {
   this.$store.dispatch('character/getHero', this.id)
   console.log(this.$route.params.id)
    // this.$store.dispatch('episode/getEpisode')
  },
  computed: {
    results () {
      // this.id = this.$route.params.id
      // console.log(this.$route.params.id)
      return this.$store.getters['character/hero']
      // console.log(this.$route.params.id)
    }
  },
  // created() {
  //   const id = this.$router.params
  //   if (id) {
  //     const {data} = this.$store.dispatch('character/getCharacters', {id})
  //     this.result = data
  //     console.log(this.result)
  //   }
  // }

}
</script>

<style scoped lang="sass">
.profile
  font-size: 18px
  color: black
  display: flex

  &__elem
    margin: 0 10px
</style>

