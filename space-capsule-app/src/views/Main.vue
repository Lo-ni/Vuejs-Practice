<template>
  <div class="main">
    <h1>Main Page</h1>
    <ul>
      <li v-for="item in this.items" :key="item.id">
        <div>
          <p>{{ item.serial }} - {{ item.type }}</p>
          <p id="text">Status: {{ item.status }}</p>
          <p id="text">{{ item.last_update }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
export default {
  name: "Main",
  data() {
    return {
      items: [],
      errorMsg: "",
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      axios
        .get("https://api.spacexdata.com/v4/capsules")
        .then((response) => {
          console.log(response);
          this.errorMsg = response.status !== 200 ? "Error catching data" : "";
          if (this.errorMsg.length === 0) {
            this.items = _.sortBy(response.data, (item) => item.status);
          }
        })
        .catch((error) => {
          this.errorMsg = error;
        });
    },
  },
};
</script>

<style>
#text {
  padding: 0px;
  margin: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: black;
}
</style>
