<template>
  <div id="dashboard">
    <modal class="rounded" :height="'auto'" name="addPoster">
      <div class="px-4 py-3">
        <h2>New Poster</h2>
      </div>
      <form v-on:submit.prevent="addPoster" class="px-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
          <input
            v-model="title"
            class="shadow appearance-none border rounded w-full mb-3 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Poster Title"
            required
          />
          <p class="text-red-500 text-xs italic">Title is required.</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            v-model="description"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Poster Description ..."
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Create Poster</button>
        </div>
      </form>
    </modal>
    <div class="w-full flex justify-between items-center">
      <h1>Digital Posters</h1>
    </div>
    <div class="flex flex-wrap items-stretch text-center m-auto w-full md:w-4/5 group">
      <div
        v-for="poster in posters"
        :key="poster.title"
        class="w-full md:w-1/4 p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-104"
      >
        <div class="h-full p-4 rounded-lg bg-white shadow-lg">
          <Trash2Icon
            @click="onDelete(poster.id)"
            size="2x"
            class="p-1 focus:shadow-outline text-red-500 hover:text-red-600 cursor-pointer"
          />
          <img class="w-full object-contain h-48" :src="poster.image" />
          <div class="px-2 py-4 mb-4 h-24 overflow-hidden">
            <div class="font-bold text-xl mb-2 text-gray-700">{{poster.title}}</div>
            <p class="text-gray-700 text-base">{{poster.description}}</p>
          </div>
          <router-link :to="{ name: 'Editor', params: { userID: userID, posterID: poster.id }}">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >Edit</button>
          </router-link>
        </div>
      </div>
      <div class="w-full md:w-1/4 p-2" @click="() => {this.$modal.show('addPoster')}">
        <div
          class="w-full h-full mr-4 p-4 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col justify-center items-center text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <div>Add Poster</div>
          <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/tailwind.css";

import { Trash2Icon, PlusCircleIcon } from "vue-feather-icons";

import axios from "axios";
import config from "../../config.json";

export default {
  name: "dashboard",
  components: { Trash2Icon, PlusCircleIcon },
  data() {
    return {
      userID: 1,
      posters: [],
      title: "",
      description: "",
      posterID: ""
    };
  },
  methods: {
    loadPostersByUserID(id) {
      const vm = this;
      axios
        .post(config.serverUrl + "/loadPostersByUserID", { userID: id })
        .then(function(response) {
          console.log(response);
          vm.$data.posters = response.data.posters;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // Creates an empty poster to be edited by the user
    // Poster ID is generated 
    addPoster() {
      console.log("Creating New Poster");
      this.posterID = this.generateID();
      const data = {
        userID: this.userID,
        poster: {
          id: this.posterID,
          content: [
            { name: "header", content: [] },
            { name: "logo", content: [] },
            { name: "credits", content: [] },
            { name: "posterColOne", content: [] },
            { name: "posterColTwo", content: [] },
            { name: "posterColThree", content: [] },
            { name: "footer", content: [] }
          ],
          title: this.title,
          description: this.description
        }
      };

      console.log(data);

      const vm = this;
      axios
        .post(config.serverUrl + "/savePoster", data)
        .then(function(response) {
          console.log(response);
          // On success update posters in dashboard and push user view to Editor with new poster
          vm.loadPostersByUserID(vm.userID);
          vm.$router.push({
            name: "Editor",
            params: { userID: vm.userID, posterID: vm.posterID }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // Allows the user to delete a poster using the Poster ID
    onDelete(id) {
      const vm = this;
      console.log(`Deleting Poster ${id}`);
      axios
        .delete(config.serverUrl + "/deletePoster", {
          data: { userID: this.userID, posterID: id }
        })
        .then(function(response) {
          console.log(response);
          vm.loadPostersByUserID(vm.userID);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    generateID() {
      return Math.random()
        .toString(36)
        .substr(2, 9);
    }
  },
  mounted() {
    // Extract userID to be save within view data for future use
    this.userID = this.$route.params.id;
    // Load posters by user ID to be placed in grid for the user to access
    this.loadPostersByUserID(this.userID);
  }
};
</script>

<style lang="scss">
</style>
