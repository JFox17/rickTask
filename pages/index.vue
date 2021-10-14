<template>
  <div class="container">
    <div class="list">
      <h1 class="list__title">
        testTask
      </h1>
      <div class="list__arrow">
        <div class="list__arrow-left" v-on:click="prevPage" id="prev">  Назад</div>
        <div class="list__arrow-right" v-on:click="nextPage" id="next"> Вперед </div>
      </div>
      <form class="list__search">
        <p>
          <input type="search" name="q" placeholder="Поиск по сайту"> 
          <input type="submit" value="Найти">
        </p>
      </form>
      <div class="list__links">
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
      page: this.$route.query.page || 1
    }
  },
  components: {
    characterBlock
  },
  mounted () {
    this.$store.dispatch('character/getCharacters', { page: this.page })
    console.log(this.$route)
  },
  computed: {
    results () {
      return this.$store.getters['character/results']
    }
  },
  methods: {
    nextPage() {
      if (this.page > 32) {
        this.page++
        this.$router.push({path: '/', query: {page: this.page}})
        this.$store.dispatch('character/getCharacters', { page: this.page })
        document.getElementById("next").style.display = "none"
      } else if (this.page < 34) {
        document.getElementById("prev").style.display = "block"
        this.page++
        this.$router.push({path: '/', query: {page: this.page}})
        this.$store.dispatch('character/getCharacters', { page: this.page })
      }
    },
    prevPage() {
      if (this.page < 3) {
        this.page--
        this.$router.push({path: '/', query: {page: this.page}})
        this.$store.dispatch('character/getCharacters', { page: this.page })
        document.getElementById("prev").style.display = "none"
      } else if ( this.page > 0) {
        document.getElementById("next").style.display = "block"
        this.page--
        this.$router.push({path: '/', query: {page: this.page}})
        this.$store.dispatch('character/getCharacters', { page: this.page })
      }
      
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
.list
  &__title
    font-family: Arial
    display: block
    font-weight: 300
    font-size: 100px
    letter-spacing: 1px

  &__subtitle
    font-weight: 300
    font-size: 42px
    word-spacing: 5px
    padding-bottom: 15px

  &__links
    padding-top: 15px
  
  &__arrow
    display: flex
    justify-content: space-around
  
  &__arrow-left
    cursor: pointer
  
  &__arrow-right
    cursor: pointer

  &__search
    cursor: pointer
    margin: 10px 0

</style>
