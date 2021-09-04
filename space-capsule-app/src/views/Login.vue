<template>
  <div class="login">
    <h1>Login</h1>
    <h6 v-if="isLoggedIn">
      {{ loginError }}
    </h6>
    <FormulateForm name="loginForm" @submit="loginUser" id="form">
      <FormulateInput
        id="input"
        name="username"
        type="text"
        v-model="input.username"
        placeholder="Username"
      />
      <FormulateInput
        id="input"
        name="password"
        type="password"
        v-model="input.password"
        placeholder="Password"
      />
      <FormulateInput id="button" type="submit" label="Login" />
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

<style>
#form {
  padding: 16px;
}

#input {
  padding: 8px;
  margin: 4px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 25%;
}

#button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 8px;
  margin-top: 16px;
  width: 25%;
  background-color: lightseagreen;
  border-radius: 4px;
  border-color: transparent;
  font-weight: bold;
}
</style>
