<template>
  <div id="static-poster">
    <div class="w-full flex justify-between items-center">
      <h1>{{posterTitle}}</h1>
    </div>
    <div id="header" class="flex-col mb-4">
      <div class="text-center w-full" v-if="this.visiblity.header">
        <div class="w-full px-4">
          <info-card-static v-for="(box, index) in header" :key="box.id" :box="header[index]"></info-card-static>
        </div>
      </div>
      <div class="flex flex-col md:flex-row text-center w-full">
        <div class="text-center w-full md:w-1/6 px-4" v-if="this.visiblity.logo">
          <info-card-static v-for="(box, index) in logo" :key="box.id" :box="logo[index]"></info-card-static>
        </div>
        <div class="text-center w-full md:w-2/3 px-4" v-if="this.visiblity.credits">
          <info-card-static v-for="(box, index) in credits" :key="box.id" :box="credits[index]"></info-card-static>
        </div>
        <div class="text-center w-full md:w-1/6 px-4" v-if="this.visiblity.qr">
          <div class="p-4 mb-3 bg-white justify-end items-center shadow rounded-lg break-words">
            <qrcode-vue class="mb-4" v-if="publishID !== ''" :value="publishLink" level="H"></qrcode-vue>
            <span v-if="publishLink !== ''">
              <a :href="publishLink">{{publishLink}}</a>
            </span>
            <span v-else>QR Code Placeholder</span>
          </div>
        </div>
      </div>
    </div>
    <div id="body" class="flex flex-col lg:flex-row mb-4">
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColOne">
        <div class="w-full px-4">
          <info-card-static
            v-for="(box, index) in posterColOne"
            :key="box.id"
            :box="posterColOne[index]"
          ></info-card-static>
        </div>
      </div>
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColTwo">
        <div class="w-full px-4">
          <info-card-static
            v-for="(box, index) in posterColTwo"
            :key="box.id"
            :box="posterColTwo[index]"
          ></info-card-static>
        </div>
      </div>
      <div class="text-center w-full md:w-1/3" v-if="this.visiblity.posterColThree">
        <div class="w-full px-4">
          <info-card-static
            v-for="(box, index) in posterColThree"
            :key="box.id"
            :box="posterColThree[index]"
          ></info-card-static>
        </div>
      </div>
    </div>
    <div id="footer" class="flex mb-4">
      <div class="text-center w-full" v-if="this.visiblity.footer">
        <div class="w-full px-4">
          <info-card-static v-for="(box, index) in footer" :key="box.id" :box="footer[index]"></info-card-static>
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

import InfoCardStatic from "../components/InfoCardStatic";

import loadData from "../data/posterJSON.json";

import axios from "axios";
import config from "../../config.json";

export default {
  name: "static-poster",
  components: {
    PlusCircleIcon,
    Trash2Icon,
    Draggable,
    InfoCardStatic,
    QrcodeVue
  },
  data() {
    return {
      preview: true,
      posterTitle: "",
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
      publishID: ""
    };
  },
  methods: {
    loadPoster(id) {
      const vm = this;
      axios
        .post(config.serverUrl + "/loadPublishedPoster", { publishID: id })
        .then(function(response) {
          const posterData = response.data.poster;
          vm.$data.posterTitle = response.data.title;

          posterData.forEach(section => {
            const name = section.name;
            let hasContent = false;

            if (section.content.length > 0) {
              section.content.forEach((content, index) => {
                vm.$set(vm.$data[name], index, content);
              });

              hasContent =
                Object.keys(section.content[0].body.content[0]).length > 1 ||
                section.content[0].body.content.length > 1;
            }

            vm.$data.visiblity[name] = hasContent;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.publishID = this.$route.params.id;
    this.loadPoster(this.publishID);
  },
  computed: {
    publishLink() {
      return config.clientUrl + "/#/p/" + this.publishID;
    }
  }
};
</script>

<style lang="scss"></style>
