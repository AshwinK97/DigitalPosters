<template>
  <div id="editor" ref="poster">
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <button class="text-red-500" text @click="snackbar = false">Close</button>
    </v-snackbar>
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
      <h1>{{posterTitle}}</h1>
      <div>
        <button
          v-if="!preview"
          @click="onSave()"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-4 rounded"
        >Save</button>
        <button
          v-if="!preview"
          @click="() => {snackbarMessage='Turn Preview On to use Publish'; snackbar=true;}"
          class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 mr-4 rounded opacity-50 cursor-not-allowed"
        >Publish</button>
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
      <div class="text-center w-full px-4" v-if="this.visiblity.header">
        <div v-if="header.length > 0">
          <info-card
            v-for="(box, index) in header"
            :key="box.id"
            :box="header[index]"
            :preview="preview"
            @on-delete="onDelete(header, index)"
            @on-change="($event) => {header[index] = $event;}"
          ></info-card>
        </div>
        <div
          @click="onAdd(header)"
          v-if="!preview && header.length === 0"
          class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <div>Add Header</div>
          <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
        </div>
      </div>
      <div class="flex flex-col md:flex-row text-center w-full">
        <div class="text-center w-full md:w-1/6 px-4" v-if="this.visiblity.logo">
          <div v-if="logo.length > 0">
            <info-card
              v-for="(box, index) in logo"
              name="logo"
              :key="box.id"
              :box="logo[index]"
              :preview="preview"
              @on-delete="onDelete(logo, index)"
              @on-change="($event) => {logo[index] = $event;}"
            ></info-card>
          </div>
          <div
            @click="onAdd(logo)"
            v-if="!preview && logo.length === 0"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700 cursor-pointer"
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
              :box="credits[index]"
              :preview="preview"
              @on-delete="onDelete(credits, index)"
              @on-change="($event) => {credits[index] = $event;}"
            ></info-card>
          </div>
          <div
            @click="onAdd(credits)"
            v-if="!preview && credits.length === 0"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <div>Add Credits</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </div>
        <div class="text-center w-full md:w-1/6 px-4">
          <div class="p-4 mb-3 bg-white justify-end items-center shadow rounded-lg break-words">
            <qrcode-vue class="mb-4" v-if="publishID !== ''" :value="publishLink" level="H"></qrcode-vue>
            <span v-if="publishID !== ''">
              <a :href="publishLink">{{publishLink}}</a>
            </span>
            <span v-else>QR Code Placeholder</span>
          </div>
        </div>
      </div>
    </div>
    <div id="body" class="flex flex-col lg:flex-row mb-4">
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColOne">
        <draggable
          class="w-full px-4 cursor-move"
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
            @on-change="($event) => {posterColOne[index] = $event;}"
          ></info-card>
          <div
            @click="onAdd(posterColOne)"
            v-if="!preview"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <div>Add Card to Column</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColTwo">
        <draggable
          class="w-full px-4 cursor-move"
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
            @on-change="($event) => {posterColTwo[index] = $event;}"
          ></info-card>
          <div
            @click="onAdd(posterColTwo)"
            v-if="!preview"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <div>Add Card to Column</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColThree">
        <draggable
          class="w-full px-4 cursor-move"
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
            @on-change="($event) => {posterColThree[index] = $event;}"
          ></info-card>
          <div
            @click="onAdd(posterColThree)"
            v-if="!preview"
            class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <div>Add Card to Column</div>
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
    </div>
    <div id="footer" class="flex mb-4">
      <div class="text-center w-full px-4" v-if="this.visiblity.footer">
        <div v-if="footer.length > 0">
          <info-card
            v-for="(box, index) in footer"
            :key="box.id"
            :box="footer[index]"
            :preview="preview"
            @on-delete="onDelete(footer, index)"
            @on-change="($event) => {footer[index] = $event;}"
          ></info-card>
        </div>
        <div
          @click="onAdd(footer)"
          v-if="!preview && footer.length === 0"
          class="p-4 mb-3 action-button bg-white shadow rounded-lg flex flex-col justify-center items-center w-full text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <div>Add Footer</div>
          <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/tailwind.css";

import Draggable from "vuedraggable";
import { Trash2Icon, PlusCircleIcon } from "vue-feather-icons";
import QrcodeVue from "qrcode.vue";
import InfoCard from "../components/InfoCard";

import axios from "axios";
import config from "../../config.json";

export default {
  name: "editor",
  components: {
    PlusCircleIcon,
    Trash2Icon,
    Draggable,
    InfoCard,
    QrcodeVue
  },
  data() {
    return {
      preview: false,
      publishID: "",
      userID: 2,
      posterID: 1,
      posterTitle: "",
      posterImage: "",
      snackbar: false,
      snackbarMessage: "",
      header: [],
      logo: [],
      credits: [],
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
      },
      sections: [
        "header",
        "logo",
        "credits",
        "posterColOne",
        "posterColTwo",
        "posterColThree",
        "footer"
      ]
    };
  },
  methods: {
    onDelete(list, index) {
      list.splice(index, 1);
    },
    onAdd(list) {
      const id = this.generateID();
      list.push({
        id: id,
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
    async onSnapshot() {
      const el = this.$refs.poster;
      this.posterImage = await this.$html2canvas(el, {
        type: "dataURL"
      });
    },
    async onSave() {
      await this.onSnapshot();
      const data = Object.assign(this.getAllPosterData(), {
        publishID: this.publishID,
        posterImage: this.posterImage
      });
      console.log(data);
      const vm = this;
      axios
        .post(config.serverUrl + "/savePoster", data)
        .then(function(response) {
          console.log(response);
          vm.$data.snackbarMessage = response.data;
          vm.$data.snackbar = true;
        })
        .catch(function(error) {
          console.log(error);
          vm.$data.snackbarMessage = response.data;
          vm.$data.snackbar = true;
        });
    },
    onPublish() {
      this.$modal.show("onPublish");
    },
    onPublishConfirm() {
      const vm = this;

      if (this.publishID === "") {
        this.publishID = this.generateID();
      }

      const data = this.getAllPosterData();
      axios
        .post(config.serverUrl + "/publishPoster", {
          poster: data.poster,
          publishID: this.publishID,
          posterTitle: this.posterTitle
        })
        .then(function(response) {
          vm.onSave();

          vm.snackbarMessage = response.data;
          vm.snackbar = true;
          vm.onPreview();

          const publishRoute = vm.$router.resolve({
            name: "StaticPoster",
            params: { id: vm.publishID }
          });
          window.open(publishRoute.href, "_blank");
        })
        .catch(function(error) {
          console.log(error);
          vm.snackbarMessage = error;
          vm.snackbar = true;
        });

      this.closeModal("onPublish");
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
    loadPoster() {
      const vm = this;
      axios
        .post(config.serverUrl + "/loadPoster", {
          userID: this.userID,
          posterID: this.posterID
        })
        .then(function(response) {
          console.log(response);

          if (response.data.poster != undefined) {
            const posterData = response.data.poster;

            if (
              response.data.publishID !== null ||
              response.data.publishID !== undefined
            ) {
              vm.$data.publishID = response.data.publishID;
            }

            if (
              response.data.posterTitle !== null ||
              response.data.posterTitle !== undefined
            ) {
              vm.$data.posterTitle = response.data.posterTitle;
            }

            posterData.forEach(section => {
              const name = section.name;
              let hasContent = false;

              if (section.content !== undefined) {
                section.content.forEach((content, index) => {
                  vm.$set(vm.$data[name], index, content);
                  localStorage[content.id] = JSON.stringify(content.body);
                });

                hasContent = true;
              }

              if (hasContent === false) {
                vm.onDelete(vm.$data[name], 0);
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    closeModal(modalName) {
      this.$modal.hide(modalName);
    },
    generateID() {
      return Math.random()
        .toString(36)
        .substr(2, 9);
    },
    updateVisibility() {
      this.sections.forEach(section => {
        if (this.$data[section].length > 0) {
          const data = JSON.parse(localStorage[this.$data[section][0].id]);
          const hasContent =
            Object.keys(data.content[0]).length > 1 || data.content.length > 1;

          this.$data.visiblity[section] = hasContent;
        } else {
          this.$data.visiblity[section] = false;
        }
      });
    },
    getAllPosterData() {
      const vm = this;
      const allPosterData = this.sections.map(section => ({
        name: section,
        content: vm.$data[section]
      }));

      return {
        userID: this.userID,
        poster: {
          id: this.posterID,
          content: allPosterData
        }
      };
    }
  },
  mounted() {
    this.userID = this.$route.params.userID;
    this.posterID = this.$route.params.posterID;

    this.loadPoster();
    this.onSave();
  },
  computed: {
    publishLink() {
      return config.clientUrl + "/#/p/" + this.publishID;
    }
  }
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
