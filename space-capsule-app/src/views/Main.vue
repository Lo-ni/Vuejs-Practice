<template>
  <div class="main">
    <h1 style="margin: 32px;">Main Page</h1>
    <h4 style="margin-start: 32px;" v-if="this.errorMsg.length > 0">
      {{ this.errorMsg }}
    </h4>
    <v-btn id="btn" v-if="this.errorMsg.length > 0" @click="navigateToLogin"
      >Go to Login</v-btn
    >
    <ul style="list-style-type: none;">
      <v-list three-line>
        <template v-for="item in this.items">
          <v-list-item :key="item.id">
            <v-list-item-avatar>
              <v-icon :color="getColor(item)">mdi-brightness-1</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ item.serial }} - {{ item.type }} ({{
                  item.status
                }})</v-list-item-title
              >
              <v-list-item-subtitle>
                {{ item.last_update }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Launches:
                {{ item.launches.length }} | Water landings:
                {{ item.water_landings }} | Land landings:
                {{ item.land_landings }} | Reuse:
                {{ item.reuse_count }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                id="iconBtn"
                :disabled="item.type !== 'Dragon 2.0'"
                @click="launch"
                ><v-icon>mdi-rocket-launch</v-icon></v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
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
    navigateToLogin() {
      this.$router.push("/");
    },
    fetchItems() {
      if (this.$store.state.user !== null) {
        axios
          .get("https://api.spacexdata.com/v4/capsules")
          .then((response) => {
            this.errorMsg =
              response.status !== 200 ? "Error catching data" : "";
            if (this.errorMsg.length === 0) {
              this.items = _.sortBy(response.data, (item) => item.status);
            }
          })
          .catch((error) => {
            this.errorMsg = error;
          });
      } else {
        this.errorMsg = "Login to proceed";
      }
    },
    launch() {
      this.$toastr.i("Launched");
    },
    getColor(item) {
      switch (item.status) {
        case "active":
          return "green";
        case "destroyed":
          return "red";
        case "retired":
          return "yellow";
        case "unknown":
          return "grey";
        default:
          return "black";
      }
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
#iconBtn {
  margin: 16px;
  color: lightseagreen;
}
#btn {
  margin-left: 32px;
  margin-top: 16px;
  background-color: lightseagreen;
}
</style>
