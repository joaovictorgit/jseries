import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'itemSerie',
  state: () => ({
    itemSerie: {}
  }),
  actions: {
    addSerie(serie) {
      this.itemSerie = { ...this.itemSerie, ...serie }
    }
  },
  getters: {
    getSerie() {
      this.itemSerie
    }
  }
})
