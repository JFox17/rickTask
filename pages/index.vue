<template>
  <div class="container">
    <div>
      <h1 class="title">
        testTask
      </h1>
      <div class="links">
        <!-- <span>
          {{ this.$store.getters['character/results'] }}
        </span> -->
        <!-- <span>
          {{ $store.getters['character/characters'] }}
        </span> -->
        <!-- <ul>
          <li
            v-for="(results, index) in results"
            :key="index"
          >
          {{results.id}}
          </li>
        </ul> -->
        <character-block
          v-for="result in results"
          :key="result.id"
          :result = "result"
        />
      </div>
    </div>
  </div>
</template>

<script>
import characterBlock from '../components/CharacterBlock.vue'
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  components: {
    characterBlock
  },
  mounted () {
    this.$store.dispatch('character/getCharacters'),
    this.$store.dispatch('character/getResults'),
    // this.$store.dispatch('character/characters', 1),
    console.log('storeeeee')
    console.log()
  },
  computed: {
    results () {
      return this.$store.getters['character/results']
    }
  }
}
</script>

<style scoped lang="sass">
.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.title
  font-family: Arial
  display: block
  font-weight: 300
  font-size: 100px
  letter-spacing: 1px

.subtitle
  font-weight: 300
  font-size: 42px
  word-spacing: 5px
  padding-bottom: 15px

.links
  padding-top: 15px

</style>
