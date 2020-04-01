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
    <div class="flex flex-col md:flex-row text-center w-full group">
      <div
        v-for="poster in posters"
        :key="poster.title"
        class="w-full md:w-1/4 mr-4 p-4 min-h-1/3 rounded-lg overflow-hidden bg-white shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-104"
      >
        <Trash2Icon
          @click="onDelete(poster.title)"
          size="2x"
          class="p-1 focus:shadow-outline text-red-500 hover:text-red-600"
        />
        <div class="px-2 py-4">
          <div class="font-bold text-xl mb-2">{{poster.title}}</div>
          <p class="text-gray-700 text-base">{{poster.description}}</p>
        </div>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit</button>
      </div>
      <div class="w-full md:w-1/4" @click="() => {this.$modal.show('addPoster')}">
        <div
          class="w-full min-h-full mr-4 p-4 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col justify-center items-center text-gray-500 hover:text-gray-700"
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
      const that = this;
      axios
        .post(config.localServerUrl + "/loadPostersByUserID", { userID: id })
        .then(function(response) {
          console.log(response);
          that.$data.posters = response.data.posters;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addPoster() {
      console.log("Adding Poster initiated");
      this.posterID = this.generateId();
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

      const that = this;
      axios
        .post(config.localServerUrl + "/savePoster", data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onDelete(id) {
      const that = this;
      console.log(`Poster: ${id}`);
      axios
        .delete(config.localServerUrl + "/deletePoster", { data: {userID: this.userID, posterID: id}})
        .then(function(response) {
          console.log(response);
          that.loadPostersByUserID(that.userID)
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    generateId() {
      return Math.random()
        .toString(36)
        .substr(2, 9);
    }
  },
  mounted() {
    this.userID = parseInt(this.$route.params.id);
    this.loadPostersByUserID(this.userID);
  }
};
</script>

<style lang="scss">
</style>
