<script>
import { defineComponent } from 'vue'
import { useStore } from '../pinia/store'
import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDcp4uP8gO7miJ0R6Ix15VEgvXvj9z5iEQ',
  authDomain: 'jseries-d179f.firebaseapp.com',
  projectId: 'jseries-d179f',
  storageBucket: 'jseries-d179f.appspot.com',
  messagingSenderId: '66608235639',
  appId: '1:66608235639:web:36787cd280fe90cea47272'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default defineComponent({
  data() {
    return {
      contentWithoutHtml: '',
      quantityEpisodes: 0,
      newComment: '',
      comments: []
    }
  },
  setup() {
    const store = useStore()
    return {
      itemSerie: store.itemSerie
    }
  },
  mounted() {
    this.loadComments()
    this.removeHtmlTags()
    this.getAllEpisodes()
  },
  methods: {
    formatarData(time) {
      const segundos = time.seconds * 1000
      const data = new Date(segundos)

      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      const ano = data.getFullYear()

      return `${dia}/${mes}/${ano}`
    },
    async loadComments() {
      const id = JSON.stringify(this.itemSerie.key.id)
      const commentCollection = doc(db, 'comments', id)
      const commentQuery = await getDoc(commentCollection)

      if (commentQuery.exists()) {
        this.comments = commentQuery.data().data
      }
    },
    async addNewComment() {
      const id = JSON.stringify(this.itemSerie.key.id)
      if (this.$refs.commentSerie.value.trim() !== '') {
        const newCom = {
          text: this.$refs.commentSerie.value,
          data: Timestamp.now(new Date())
        }
        if (this.comments === []) {
          this.comments.data.push(newCom)
        } else {
          this.comments.push(newCom)
        }
        await setDoc(doc(db, 'comments', id), {
          data: this.comments
        })
        this.$refs.commentSerie.value = ''
      }
    },
    removeHtmlTags() {
      const doc = new DOMParser().parseFromString(this.itemSerie.key.summary, 'text/html')
      this.contentWithoutHtml = doc.body.textContent || ''
    },
    async getAllEpisodes() {
      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${this.itemSerie.key.id}/episodes`
        )
        const data = await response.json()
        this.quantityEpisodes = data.length
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<template>
  <div class="container-item-detail">
    <div class="header-home">
      <h1>JSeries</h1>
    </div>
    <div class="container-movie-series">
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
      <div class="form-comments">
        <h1>Comentários</h1>
        <textarea ref="commentSerie" type="text" placeholder="Escreva seu comentário"></textarea>
        <button @click="addNewComment">Add</button>

        <div class="item-comment" v-for="(c, index) in comments" :key="index">
          <h1>Usuário {{ index + 1 }}</h1>
          <label>
            {{ c.text }}
          </label>
          <span>
            {{ formatarData(c.data) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container-item-detail {
  width: 100%;
  height: 1310px;
  background: #181818;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 3;
}

.header-home {
  display: flex;
  align-items: center;
  position: absolute;
  width: 90%;
  top: 40px;
  left: 5%;
  height: 80px;
  padding: 10px;
  transform: skewX(-20deg);
  background: rgba(44, 10, 117, 1);
}

.header-home h1 {
  font-size: 30px;
  margin-left: 25px;
  font-weight: 800;
  color: #ffffff;
}

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

.form-comments {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 150px;
  margin-left: 80px;
}

.form-comments h1 {
  color: #fff;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: 800;
}

.form-comments textarea {
  width: 300px;
  height: 100px;
  outline: none;
  border: none;
  border-radius: 10px;
  resize: none;
  background: rgba(24, 27, 31, 1);
  color: #fff;
  padding: 20px 25px;
}

.form-comments button {
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background: rgba(44, 10, 117, 0.7);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.form-comments button:hover {
  background: rgba(44, 10, 117, 1);
}

.item-comment {
  width: 380px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.item-comment label {
  width: 250px;
  height: 100px;
  color: #fff;
}

.item-comment span {
  width: 150px;
  position: relative;
  left: 270px;
  top: -120px;
}
</style>
