<script>
import { defineComponent } from 'vue'
import { useStore } from '../pinia/store'
export default defineComponent({
  setup() {
    const store = useStore()
    return {
      addSerie: store.addSerie
    }
  },
  data() {
    return {
      series: [],
      perPage: 20,
      currentPage: 1,
      prev: '<',
      next: '>'
    }
  },
  mounted() {
    this.getAll()
  },
  computed: {
    totalPages() {
      return Math.ceil(this.series.length / this.perPage)
    },

    paginatedSeries() {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      return this.series.slice(startIndex, endIndex)
    }
  },
  methods: {
    setSerieDetail(serie) {
      this.addSerie({ key: serie })
      this.$router.push({ name: 'item-detail' })
    },
    goToPage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage
      }
    },
    async getAll() {
      try {
        const response = await fetch('https://api.tvmaze.com/shows')
        const data = await response.json()
        this.series = data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<template>
  <div class="container-grid-list">
    <div class="btns-pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">{{ prev }}</button>
      <span>{{ currentPage }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        {{ next }}
      </button>
    </div>
    <div class="grid-container">
      <button class="grid-item" v-for="s in paginatedSeries" :key="s.id" @click="setSerieDetail(s)">
        <img class="img-cover" :src="s.image.medium" alt="cover" />
        <h1 class="title-item-grid">
          {{ s.name }}
        </h1>
      </button>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
.container-grid-list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: absolute;
  top: 150px;
  left: 50px;
}

.btns-pagination {
  position: absolute;
  right: 20px;
  top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  margin-top: 10px;
}

.btns-pagination button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-weight: 700;
  color: #fff;
  background: rgb(44, 10, 117);
  font-weight: 600;
  font-size: 15px;
}

.btns-pagination span {
  color: #d9d9d9;
  font-weight: 600;
}
.grid-container {
  margin-top: 150px;
  margin-left: 80px;
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 100px));
  gap: 15px;
}
.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 149px;
  height: 240px;
  border-radius: 20px;
  text-align: center;
  border: none;
  filter: brightness(95%) contrast(90%) saturate(95%);
}

.img-cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 149px;
  height: 240px;
  border-radius: 20px;
  z-index: -2;
  cursor: pointer;
}

.title-item-grid {
  position: relative;
  width: 120px;
  height: 37px;
  top: 100px;
  left: 5px;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #ffffff;
  z-index: 2;
}
</style>
