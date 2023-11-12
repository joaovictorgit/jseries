<script>
import { defineComponent } from 'vue'
import GridList from './components/GridList.vue'
export default defineComponent({
  components: {
    GridList
  },
  name: 'App'
})
</script>

<template>
  <div class="constainer">
    <div class="header-home">
      <h1>JSeries</h1>
    </div>
    <h1 class="title-body">Séries</h1>
    <GridList />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.header-home {
  display: flex;
  align-items: center;
  position: absolute;
  width: 90%;
  top: 20px;
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

.title-body {
  width: 100px;
  height: 50px;
  text-align: center;
  border-left: 5px solid rgb(44, 10, 117);
  padding: 5px;
  color: #ffffff;
  position: absolute;
  top: 150px;
  left: 50px;
}
</style>
