<template>
  <div id="editor">
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <modal class="rounded" name="onSave">
      <div
        class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
        role="alert"
      >
        <p class="font-bold">Informational message</p>
        <p class="text-sm">You are about to save the contents of this poster! Please check the data.</p>
      </div>
      <div class="text-green-700 p-8">
        <p class="text-base">{{ allPosterData }}</p>
      </div>
    </modal>
    <modal name="onPublish">
      <div class="flex flex-col">
        <div
          class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >Are you sure you want to Publish?</div>
        <div class="flex justify-center my-24">
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mx-8 rounded w-1/3"
            @click="closeModal('onPublish')"
          >Cancel</button>
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-8 rounded w-1/3"
            @click="onPublishConfirm()"
          >Confirm</button>
        </div>
      </div>
    </modal>
    <div class="w-full flex justify-between items-center">
      <h1>Digital Posters</h1>
      <div>
        <button
          v-if="!preview"
          @click="onSave()"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-4 rounded"
        >Save</button>
        <button
          v-if="preview"
          @click="onPublish()"
          class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 mr-4 rounded"
        >Publish</button>
        <button
          @click="onPreview()"
          class="text-white font-bold py-2 px-4 rounded"
          :class="preview ? 'bg-orange-600 hover:bg-orange-500' : 'bg-orange-500 hover:bg-orange-600'"
        >Turn Preview {{ preview ? "Off" : "On" }}</button>
      </div>
    </div>
    <div id="header" class="flex-col mb-4">
      <div class="text-center w-full" v-if="this.visiblity.header">
        <draggable
          class="w-full px-4"
          ghost-class="moving-card"
          filter=".action-button"
          :disabled="preview"
          :list="header"
          :animation="200"
        >
          <div v-if="header.length > 0">
            <info-card
              v-for="(box, index) in header"
              :key="box.id"
              :box="header[index]"
              :preview="preview"
              @on-delete="onDelete(header, index)"
              @on-change="onChange($event, header, index)"
            ></info-card>
          </div>
          <div
            @click="onAdd(header)"
            v-if="!preview && header.length === 0"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <div>Add Header</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
      <div class="flex flex-col md:flex-row text-center w-full">
        <div class="text-center w-full md:w-1/6 px-4" v-if="this.visiblity.logo">
          <div v-if="logo.length > 0">
            <info-card
              v-for="(box, index) in logo"
              name="logo"
              :key="box.id"
              :box="box[index]"
              :preview="preview"
              @on-delete="onDelete(logo, index)"
              @on-change="onChange($event, logo)"
            ></info-card>
          </div>
          <div
            @click="onAdd(logo)"
            v-if="!preview && logo.length === 0"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <div>Add Logo</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </div>
        <div class="text-center w-full md:w-2/3 px-4" v-if="this.visiblity.credits">
          <div v-if="credits.length > 0">
            <info-card
              v-for="(box, index) in credits"
              :key="box.id"
              :box="box[id]"
              :preview="preview"
              @on-delete="onDelete(credits, index)"
              @on-change="onChange($event, credits)"
            ></info-card>
          </div>
          <div
            @click="onAdd(credits)"
            v-if="!preview && credits.length === 0"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <div>Add Credits</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </div>
        <div class="text-center w-full md:w-1/6 px-4" v-if="this.visiblity.qr">
          <div
            class="p-4 mb-3 bg-white justify-between items-center shadow rounded-lg"
          >QR Code Placeholder</div>
        </div>
      </div>
    </div>
    <div id="body" class="flex flex-col lg:flex-row mb-4">
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColOne">
        <draggable
          class="w-full px-4"
          group="all-users"
          ghost-class="moving-card"
          filter=".action-button"
          :disabled="preview"
          :list="posterColOne"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in posterColOne"
            :key="box.id"
            :box="posterColOne[index]"
            :preview="preview"
            @on-delete="onDelete(posterColOne, index)"
            @on-change="onChange($event, posterColOne, index)"
          ></info-card>
          <div
            @click="onAdd(posterColOne)"
            v-if="!preview"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColTwo">
        <draggable
          class="w-full px-4"
          group="all-users"
          ghost-class="moving-card"
          filter=".action-button"
          :disabled="preview"
          :list="posterColTwo"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in posterColTwo"
            :key="box.id"
            :box="posterColTwo[index]"
            :preview="preview"
            @on-delete="onDelete(posterColTwo, index)"
            @on-change="onChange($event, posterColTwo, index)"
          ></info-card>
          <div
            @click="onAdd(posterColTwo)"
            v-if="!preview"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColThree">
        <draggable
          class="w-full px-4"
          group="all-users"
          ghost-class="moving-card"
          filter=".action-button"
          :disabled="preview"
          :list="posterColThree"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in posterColThree"
            :key="box.id"
            :box="posterColThree[index]"
            :preview="preview"
            @on-delete="onDelete(posterColThree, index)"
            @on-change="onChange($event, posterColThree, index)"
          ></info-card>
          <div
            @click="onAdd(posterColThree)"
            v-if="!preview"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
    </div>
    <div id="footer" class="flex mb-4">
      <div class="text-center w-full" v-if="this.visiblity.footer">
        <draggable
          class="w-full px-4"
          ghost-class="moving-card"
          filter=".action-button"
          :disabled="preview"
          :list="footer"
          :animation="200"
        >
          <div v-if="footer.length > 0">
            <info-card
              v-for="(box, index) in footer"
              :key="box.id"
              :box="footer[index]"
              :preview="preview"
              @on-delete="onDelete(footer, index)"
              @on-change="onChange($event, footer, index)"
            ></info-card>
          </div>
          <div
            @click="onAdd(footer)"
            v-if="!preview && footer.length === 0"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <div>Add Footer</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/tailwind.css";

import Draggable from "vuedraggable";
import { Trash2Icon, PlusCircleIcon } from "vue-feather-icons";

import InfoCard from "../components/InfoCard";

import loadData from "../data/posterJSON.json";

import axios from "axios";
import config from "../../config.json";

export default {
  name: "editor",
  components: {
    PlusCircleIcon,
    Trash2Icon,
    Draggable,
    InfoCard
  },
  data() {
    return {
      preview: false,
      userID: 1,
      posterID: 1,
      snackbar: false,
      snackbarMessage: "",
      header: [],
      logo: [],
      credits: [],
      qr: [],
      posterColOne: [],
      posterColTwo: [],
      posterColThree: [],
      footer: [],
      visiblity: {
        header: true,
        logo: true,
        credits: true,
        qr: true,
        posterColOne: true,
        posterColTwo: true,
        posterColThree: true,
        footer: true
      }
    };
  },
  methods: {
    // Use to load new data
    loadPoster(posterData) {
      const that = this;
      axios
        .post(config.serverUrl + "/loadPoster", { userID: this.userID })
        .then(function(response) {
          const posterData = response.data;

          posterData.forEach(section => {
            const name = section.name;

            section.content.forEach((content, index) => {
              that.$set(that.$data[name], index, content);
            });

            const hasContent =
              Object.keys(section.content[0].body.content[0]).length > 1 ||
              section.content[0].body.content.length > 1;

            that.$data.visiblity[name] = hasContent;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onDelete(list, index) {
      list.splice(index, 1);
    },
    onChange(box, list, index) {
      console.log(JSON.stringify(box));
      list[index] = box;
    },
    onChange(box, item) {
      item = box;
    },
    onAdd(list) {
      list.push({
        id: this.generateId(),
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph"
            }
          ]
        }
      });
    },
    onSave() {
      const data = this.getAllPosterData();
      // localStorage["posterSave"] = JSON.stringify(data);
      const that = this;
      axios
        .post(config.serverUrl + "/savePoster", data)
        .then(function(response) {
          console.log(response);
          that.$data.snackbarMessage = response.data;
          that.$data.snackbar = true;
        })
        .catch(function(error) {
          console.log(error);
          that.$data.snackbarMessage = response.data;
          that.$data.snackbar = true;
        });
    },
    onLoad() {
      const that = this;
      axios
        .post(config.serverUrl + "/loadPoster", { userID: this.userID })
        .then(function(response) {
          const posterData = response.data;
          console.log(posterData);
          posterData.forEach(section => {
            const name = section.name;

            section.content.forEach((content, index) => {
              that.$set(that.$data[name], index, content);
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onPublish() {
      this.onSave();
      this.$modal.show("onPublish");
    },
    onPublishConfirm() {
      const that = this;
      axios
        .post(config.serverUrl + "/publishPoster", { userID: this.userID })
        .then(function(response) {
          console.log(response);
          that.snackbarMessage = response.data;
          that.snackbar = true;
        })
        .catch(function(error) {
          console.log(error);
          that.snackbarMessage = error;
          that.snackbar = true;
        });

      this.closeModal("onPublish");
    },
    closeModal(modalName) {
      this.$modal.hide(modalName);
    },
    generateId() {
      return Math.random()
        .toString(36)
        .substr(2, 9);
    },
    onPreview() {
      this.preview = !this.preview;

      if (this.preview) {
        this.updateVisibility();
      } else {
        this.visiblity = {
          header: true,
          logo: true,
          credits: true,
          qr: true,
          posterColOne: true,
          posterColTwo: true,
          posterColThree: true,
          footer: true
        };
      }
    },
    updateVisibility() {
      const sections = [
        "header",
        "logo",
        "credits",
        "qr",
        "posterColOne",
        "posterColTwo",
        "posterColThree",
        "footer"
      ];

      sections.forEach(section => {
        const data = JSON.parse(localStorage[this.$data[section][0].id]);
        const hasContent =
          Object.keys(data.content[0]).length > 1 || data.content.length > 1;

        this.$data.visiblity[section] = hasContent;
      });
    },
    getAllPosterData() {
      const headerData = [
        {
          name: "header",
          content: this.header.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];
      const logoData = [
        {
          name: "logo",
          content: this.logo.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];
      const creditsData = [
        {
          name: "credits",
          content: this.credits.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];
      const qrData = [
        {
          name: "qr",
          content: this.qr.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];
      const posterColOneData = [
        {
          name: "posterColOne",
          content: this.posterColOne.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];
      const posterColTwoData = [
        {
          name: "posterColTwo",
          content: this.posterColTwo.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];
      const posterColThreeData = [
        {
          name: "posterColThree",
          content: this.posterColThree.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];
      const footerData = [
        {
          name: "footer",
          content: this.footer.map(box => {
            if (localStorage[box.id] !== undefined) {
              return {
                id: box.id,
                body: JSON.parse(localStorage[box.id])
              };
            } else {
              return {
                id: box.id,
                body: {
                  type: "doc",
                  content: []
                }
              };
            }
          })
        }
      ];

      const allPosterData = headerData.concat(
        logoData,
        creditsData,
        qrData,
        posterColOneData,
        posterColTwoData,
        posterColThreeData,
        footerData
      );

      return {
        userID: this.userID,
        poster: {
          id: this.posterID,
          content: allPosterData
        }
      };
    }
  },
  computed: {
    allPosterData() {
      return this.getAllPosterData();
    }
  }
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
