<template>
  <div class="login">
    <h1 style="margin: 32px;">Login</h1>
    <v-form style="margin: 32px;" ref="loginForm">
      <v-text-field
        v-model="input.username"
        :rules="input.rulesUsername"
        label="Username"
        required
      />
      <v-text-field
        type="password"
        v-model="input.password"
        :rules="input.rulesPassword"
        label="Passwort"
        required
      />
      <v-btn id="button" @click="loginUser">Login</v-btn>
    </v-form>
    <p style="margin: 32px;" v-if="loginError.length > 0">
      {{ loginError }}
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        rulesUsername: [
          (v) => !!v || "Erforderlich",
          (v) =>
            (v && v.length > 2 && v.length < 11) ||
            "Muss zwischen 3 und 10 Zeichen lang sein",
        ],
        rulesPassword: [
          (v) => !!v || "Erforderlich",
          (v) =>
            (v && v.length > 5 && v.length < 13) ||
            "Muss zwischen 6 und 12 Zeichen lang sein",
        ],
        password: "",
      },
      loginError: "",
    };
  },
  methods: {
    loginUser() {
      if (this.$refs.loginForm.validate()) {
        axios
          .get("https://randomuser.me/api/")
          .then((response) => {
            let statusOk = response.status === 200;
            this.loginError = !statusOk ? "Login Error" : "";
            if (statusOk) {
              this.$store.commit("loginUser", response.data.results[0]);
              this.$router.push("main");
            }
          })
          .catch((error) => {
            this.loginError = error;
          });
      }
    },
  },
};
</script>

<style>
#button {
  margin-top: 32px;
  width: 100%;
  background-color: lightseagreen;
}
</style>
