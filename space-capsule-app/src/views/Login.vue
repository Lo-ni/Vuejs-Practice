<template>
  <div class="login">
    <h1>Login</h1>
    <h6 v-if="isLoggedIn">
      {{ loginError }}
    </h6>
    <FormulateForm name="loginForm" @submit="loginUser">
      <FormulateInput
        name="username"
        type="text"
        v-model="input.username"
        placeholder="Username"
      />
      <FormulateInput
        name="password"
        type="password"
        v-model="input.password"
        placeholder="Password"
      />
      <FormulateInput type="submit" label="Login" />
    </FormulateForm>
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
        password: "",
      },
      isLoggedIn: false,
      loginError: "",
    };
  },
  methods: {
    loginUser() {
      this.$formulate.handle(
        {
          inputErrors: {
            username:
              this.input.username.length < 3 ? "Username too short" : "",
            password:
              this.input.password.length < 6 ? "Password too short" : "",
          },
        },
        "loginForm"
      );

      if (this.input.username.length >= 3 && this.input.password.length >= 6) {
        axios
          .get("https://randomuser.me/api/")
          .then((response) => {
            this.isLoggedIn = response.status === 200;
            this.loginError = !this.isLoggedIn ? "Login Error" : "";
            if (this.isLoggedIn) {
              this.$store.commit("loginUser", response.data.results[0]);
              this.$router.push("main");
            }
          })
          .catch((error) => {
            this.isLoggedIn = false;
            this.loginError = error;
          });
      } else {
        this.isLoggedIn = false;
      }
    },
  },
};
</script>
