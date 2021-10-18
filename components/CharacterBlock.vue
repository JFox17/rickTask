<template>
  <div class="character-block">
    <div>
      <img :src="result.image" :alt="result.name" class="character-block__img">
    </div>
    <div  class="character-block__elem-block">
      <span class="character-block__elem character-block__elem-dop" @click="test(result.id)">Имя персонажа: {{ result.name }}</span>
      <span class="character-block__elem">Статус: {{ result.status }}</span>
      <span class="character-block__elem">Эпизоды:</span>
      <div class="character-block__episode character-block__elem-dop">
        <span
          v-for="(element, index) in result.episode.slice( 0,5 )"
          :key="index"
        >
        {{ element }}
        </span>
      </div>
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
    }
  },
  data() {
    return {
      url: [],
      elemUrl: []
    }
  },
  methods: {
    test(id) {
      this.$router.push({ path: `/character/${id}`})
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
  background: rgb(60, 62, 68)
  border-radius: 15px
  padding: 20px
  @media(max-width: 450px)
    flex-direction: column

  &__elem-block
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-around

  &__img
    max-width: 200px
    border-radius: 15px
    @media(min-width: 370px) and (max-width: 600px)
      min-width: 150px
    @media(max-width: 369px)
      min-width: 120px

  &__elem
    display: flex
    color: rgb(245, 245, 245)
    font-family: Arial
    font-size: 16px
    font-weight: bold
    @media(max-width: 600px)
      font-size: 14px

  &__elem-dop
    cursor: pointer
</style>
