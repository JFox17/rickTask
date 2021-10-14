<template>
  <div class="character-block">
    <div class="character-block__img">
      <img :src="result.image" :alt="result.name" class="character-block__img">
    </div>
    <span class="character-block__elem">{{ result.name }}</span>
    <span class="character-block__elem">{{ result.status }}</span>
    <span class="character-block__episode">{{ result.episode.indexOf(1, 5) }}</span>
  </div>
</template>

<script>

export default {
  name: 'character-block',
  props: {
    result: {
      type: Object,
      required: true,

    }
  }
}
</script>

<style scoped lang="sass">
.character-block
  display: flex
  justify-content: space-around
  max-width: 600px

  &__img
    width: 200px

  &__elem
    margin: 0 10px
</style>
