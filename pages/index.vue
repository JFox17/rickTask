<template>
  <div class="container">
    <div class="list">
      <h1 class="list__title">
        Test task
      </h1>
      <div class="list__arrow">
        <div class="list__arrow-left" v-on:click="prevPage" id="prev"> Назад</div>
        <div class="list__arrow-right" v-on:click="nextPage" id="next"> Вперед </div>
      </div>
      <div class="list__filter">
        <div class="list__search">
          <input type="search" v-model="name" placeholder="Поиск по сайту" @input="searchName">
        </div>
        <div class="list__selected">
          <select v-model="status" @change="selectStatus" class="list__selected-text">
            <option disabled value="">Выберите статус</option>
            <option>alive</option>
            <option>dead</option>
            <option>unknown</option>
          </select>
        </div>
        <button v-on:click="clearStatus" class="list__btn">Сбросить</button>
      </div>
      <div class="list__links">
        <div v-for="(result, index) in results" :key= "index" class="character-block">
          <div>
            <img v-if="result.image && result.name" :src="result.image" :alt="result.name" class="character-block__img">
          </div>
          <div  class="character-block__elem-block">
            <span v-if="result.name" class="character-block__elem character-block__elem-dop" @click="routeToCharacter(result.id)">Имя персонажа: {{ result.name }}</span>
            <span v-if="result.status" class="character-block__elem">Статус: {{ result.status }}</span>
            <span class="character-block__elem">Эпизоды:</span>
            <div class="character-block__episode character-block__elem-dop">
              <span
                v-for="(episode, episodeIndex) in result.episode.slice(0, 5)"
                :key="episodeIndex"
              >
              <span v-if="episode !== undefined" @click="routeToEpisode(episode.id)">{{ episode.name }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: this.$route.query.page || 1,
      name: '',
      status: ''
    }
  },
  mounted () {
    this.$store.dispatch('character/getCharacters', { page: this.page })
  },
  computed: {
    results () {
      return this.$store.getters['character/results']
    }
  },
  methods: {
    routeToCharacter(id) {
      this.$router.push({ path: `/character/${id}`})
    },
    routeToEpisode(id) {
      this.$router.push({ path: `/episode/${id}`})
    },
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
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  background: rgb(32, 35, 41)
  max-width: 1440px
  font-family: Arial
.list
  &__title
    display: block
    font-weight: 300
    font-size: 100px
    letter-spacing: 1px
    color: whitesmoke
    @media(min-width: 370px) and (max-width: 600px)
      font-size: 80px
    @media(max-width: 369px)
      font-size: 60px

  &__subtitle
    font-weight: 300
    font-size: 42px
    word-spacing: 5px
    padding-bottom: 15px

  &__links
    padding-top: 15px
    display: flex
    flex-wrap: wrap
    justify-content: space-around

  &__arrow
    display: flex
    justify-content: space-around
    color: rgb(245, 245, 245)
    font-size: 16px
    font-weight: bold

  &__arrow-left
    cursor: pointer

  &__arrow-right
    cursor: pointer

  &__filter
    display: flex
    justify-content: space-around
    max-width: 900px
    margin: 10px 0
    @media(max-width: 450px)
      flex-direction: column
      width: 80%
      margin: 10px auto


  &__search
    cursor: pointer
    border: 2px solid whitesmoke
    margin: 10px 0
    padding: 10px
    background: whitesmoke

  &__selected
    cursor: pointer
    border: 2px solid whitesmoke
    margin: 10px 0
    padding: 10px
    background: whitesmoke

  &__selected-text
    color: grey

  &__btn
    margin: 10px 0
    padding: 2px 10px
    background: #3b3e43
    color: whitesmoke
    font-size: 16px
    font-weight: bold
    border-radius: 7px
    @media(max-width: 450px)
      width: 140px
      height: 50px

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
    margin-left: 10px
    width: 300px

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

  &__episode
    color: rgb(245, 245, 245)
    font-family: Arial
    font-size: 16px
    line-height: 20px
    font-weight: bold
    display: flex
    flex-direction: column
</style>
