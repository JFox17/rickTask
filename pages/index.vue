<template>
  <div class="container">
    <div class="list">
      <h1 class="list__title">
        testTask
      </h1>
      <div class="list__arrow">
        <div class="list__arrow-left" v-on:click="prevPage" id="prev"> Назад</div>
        <div class="list__arrow-right" v-on:click="nextPage" id="next"> Вперед </div>
      </div>
      <div class="list__search">
        <input type="search" v-model="name" placeholder="Поиск по сайту" @input="searchName"> 
      </div>
      <div class="list__selected">
        <select v-model="status" @change="selectStatus">
          <option disabled value="">Выберите статус</option>
          <option>alive</option>
          <option>dead</option>
          <option>unknown</option>
        </select>
      </div>
      <button v-on:click="clearStatus">Сбросить</button>
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
      page: this.$route.query.page || 1,
      name: '',
      status: ''
    }
  },
  components: {
    characterBlock
  },
  mounted () {
    this.$store.dispatch('character/getCharacters', { page: this.page })
    this.$store.dispatch('episode/getEpisode')
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
      
    },
    searchName() {
      if (this.name === '') {
        this.$store.dispatch('character/getCharacters', { page: this.page })
      } else {
        this.$store.dispatch('character/getCharacters', { name: this.name, status: this.status })
      }
      
    },
    selectStatus() {
      this.$store.dispatch('character/getCharacters', { page: this.page, status: this.status, name: this.name })
    },
    clearStatus() {
      this.status = ''
      this.$store.dispatch('character/getCharacters', { page: this.page, name: this.name })
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
    border: 2px solid black
    margin: 10px 0

  &__selected
    cursor: pointer
    border: 2px solid black
    margin: 10px 0

</style>
