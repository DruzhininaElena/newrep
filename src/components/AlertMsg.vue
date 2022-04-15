<template>
  <div class="weather-in-city__alert" :style="msgColor">
    <div>
      {{ msg }} 
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertMsg",
  props: {
    msg: String,
    msgColor: String
  },
};
</script>

<style scoped>
.weather-in-city__alert {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 99;
  width: 150px;
  border-radius: 5px;
}
</style>




