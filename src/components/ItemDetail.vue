<script>
import { defineComponent } from 'vue'
import { useStore } from '../pinia/store'
export default defineComponent({
  setup() {
    const store = useStore()
    return {
      itemSerie: store.itemSerie
    }
  }
})
</script>

<template>
  <div class="movie-series">
    <div class="container-details">
      <img :src="itemSerie.key.image.original" alt="itemSerie.key.id" class="detail-cover" />
      <div class="container-poster-details">
        <img :src="itemSerie.key.image.original" alt="itemSerie.key.id" class="detail-poster" />
        <label> {{ itemSerie.key.name ? itemSerie.key.name : null }} </label>
      </div>

      <div class="description">
        <label class="lbl-description">
          {{ contentWithoutHtml ? contentWithoutHtml : null }}
        </label>
        <div class="container-genres">
          <span>Gênero: </span>
          <div class="genre" v-for="s in itemSerie.key.genres" :key="s">
            <label>{{ s }}</label>
          </div>
        </div>
        <div class="quantity-episodes">
          <span
            >Episódios:
            {{ quantityEpisodes }}
          </span>
        </div>
        <div className="container-average">
          <span className="average">
            Avaliação:
            {{ itemSerie.key.rating.average ? itemSerie.key.rating.average : null }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-movie-series {
  display: flex;
  flex-direction: column;
}

.container-details {
  width: 100%;
  height: 450px;
  margin-top: 180px;
}

.detail-cover {
  position: absolute;
  left: calc(5% - 10px);
  border-radius: 20px;
  opacity: 0.3;
  width: 90%;
  height: 500px;
  z-index: 0;
}

.container-poster-details {
  width: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 3;
  top: calc(20% - 10px);
  left: calc(6%);
}

.container-poster-details label {
  color: #fff;
  margin-top: 10px;
  font-size: 1em;
  font-weight: 500;
}

.detail-poster {
  width: 10rem;
  height: 200px;
  border-radius: 20px;
}

.description {
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 2;
  left: calc(20% - 10px);
  bottom: calc(30% - 10px);
}

.description .lbl-description {
  color: #fff;
  font-size: 0.9em;
  font-weight: 800;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container-genres {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  margin-top: 20px;
  align-items: center;
  color: #fff;
}

.container-genres label {
  font-size: 0.8em;
  font-weight: 800;
}

.container-average {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  color: #fff;
}

.container-average span {
  font-weight: 800;
  font-size: 0.8em;
}

.quantity-episodes {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  margin-top: 30px;
  color: #fff;
}

.quantity-episodes span {
  font-weight: 800;
  font-size: 0.8em;
}
</style>
