<template>
  <div id="auth">
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <button class="text-red-500" text @click="snackbar = false">Close</button>
    </v-snackbar>
    <div class="w-full">
      <h1>Digital Posters</h1>
    </div>
    <div class="w-full max-w-xs flex flex-col justify-between items-center">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="password"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 bg-gray-200 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="mb-6" v-if="!login">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Re-enter Password</label>
          <input
            v-model="confirmPassword"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 bg-gray-200 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex items-center justify-between" v-if="login">
          <button
            @click="onLogin"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Sign In</button>
          <a
            @click="() => {this.login = false}"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >Need to make an Account?</a>
        </div>
        <div class="flex items-center justify-between" v-else>
          <button
            @click="onSignUp"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Sign Up</button>
          <a
            @click="() => {this.login = true}"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >Have an Account?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "../assets/css/tailwind.css";

import { Trash2Icon, PlusCircleIcon } from "vue-feather-icons";

import axios from "axios";
import config from "../../config.json";

export default {
  name: "auth",
  components: {
    PlusCircleIcon,
    Trash2Icon
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      login: true,
      snackbar: false,
      snackbarMessage: ""
    };
  },
  methods: {
    onLogin() {
      const vm = this;
      axios
        .post(config.serverUrl + "/login", {
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          console.log(response);

          vm.snackbarMessage = "Login Successful!";
          vm.snackbar = true;

          vm.$router.push({
            name: "Dashboard",
            params: { id: response.data.userID }
          });
        })
        .catch(function(error) {
          console.log(error)
          vm.snackbarMessage = "Username or Password is incorrect.";
          vm.snackbar = true;
        });
    },
    onSignUp() {
      const vm = this;
      if (this.password === this.confirmPassword) {
        axios
          .post(config.serverUrl + "/signup", {
            username: this.username,
            password: this.password
          })
          .then(function(response) {
            console.log(response);
            vm.snackbarMessage = "Signup Successful!";
            vm.snackbar = true;

            vm.$router.push({
              name: "Dashboard",
              params: { id: response.data.userID }
            });
          })
          .catch(function(error) {
            vm.snackbarMessage = "User already exists.";
            vm.snackbar = true;
          });
      } else {
        this.snackbarMessage = "Passwords do not match!";
        this.snackbar = true;
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss"></style>
