<template>
  <div class="favourite-cities container">
    <h1 class="mb-5">Список избранных городов</h1>
    <div
      v-for="city in getFavouriteCitiesList"
      :key="city.id"
      class="d-flex justify-content-between mb-2"
    >
      <li>{{ city.name }}</li>
      <b-button @click="deleteCityFromFavourite(city)" variant="danger" size="sm"
        >Удалить</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FavouriteCities",
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters("favourite", ["getFavouriteCitiesList"]),
  },
  methods: {
    ...mapActions("favourite", ["removeCityFromFavourite", "fetchFavouriteCities"]),
    deleteCityFromFavourite({ id }) {
      this.removeCityFromFavourite(id);
    }
  },
  created() {
    this.fetchFavouriteCities();
  },
};
</script>

<style scoped>
.favourite-cities {
  width: 50%;
  min-width: 300px;
}
li {
  list-style-type: none
}
</style>
