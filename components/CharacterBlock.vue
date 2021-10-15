<template>
  <div class="character-block">
    <div class="character-block__img">
      <img :src="result.image" :alt="result.name" class="character-block__img">
    </div>
    <span class="character-block__elem" @click="test()">{{ result.name }}</span>
    <span class="character-block__elem">{{ result.status }}</span>
    <div class="character-block__episode">
      <span
        v-for="(element, index) in result.episode.slice( 0,5 )"
        :key="index"
      >
        {{ element }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'character-block',
  props: {
    result: {
      type: Object,
      required: true
    },
    name: null,
    id: null
  },
  methods: {
    test() {
      this.$router.push({ path: '/character', query: {id: this.result.id}})
      this.$store.dispatch('character/getCharacters', {id: this.result.id})
      // console.log(this.$store.getters['character/getCharacters', {id: this.result.id}])
    //  id = result.id
    //   console.log(id)
      // this.$store.dispatch('character/getCharacters', {id: this.id})
      
      // const {id} =this.$router.params
      // this.name = this.$store.dispatch('character/getCharacters', {id})
      // console.log(this.name)
    }
  }
}
</script>

<style scoped lang="sass">
.character-block
  display: flex
  justify-content: space-around
  max-width: 600px
  margin-bottom: 20px

  &__img
    width: 200px

  &__elem
    margin: 0 10px
    display: flex
</style>
