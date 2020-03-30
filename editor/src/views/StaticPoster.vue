<template>
  <div id="static-poster">
    <div class="w-full flex justify-between items-center">
      <h1>Digital Posters</h1>
    </div>
    <div id="header" class="flex-col mb-4">
      <div class="text-center w-full" v-if="this.visiblity.header">
        <div class="w-full px-4">
          <info-card-static v-for="(box, index) in header" :key="box.id" :box="header[index]"></info-card-static>
        </div>
      </div>
      <div class="flex flex-col md:flex-row text-center w-full">
        <div class="text-center w-full md:w-1/6 px-4" v-if="this.visiblity.logo">
          <info-card-static :key="logo.id" :box="logo[0]"></info-card-static>
        </div>
        <div class="text-center w-full md:w-2/3 px-4" v-if="this.visiblity.credits">
          <info-card-static
            :key="credits.id"
            :box="credits[0]"
            @on-change="onChange($event, credits)"
          ></info-card-static>
        </div>
        <div class="text-center w-full md:w-1/6 px-4" v-if="this.visiblity.qr">
          <info-card-static :key="qr.id" :box="qr[0]"></info-card-static>
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
    InfoCardStatic
  },
  data() {
    return {
      preview: true,
      userID: 1,
      posterID: 1,
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
    loadPoster(id) {
      const that = this;
      axios
        .post(config.serverUrl + "/loadPoster", { userID: id })
        .then(function(response) {
          const posterData = response.data;
          console.log(response);
          posterData.forEach(section => {
            const name = section.name;
            let hasContent = false;
            // TODO: QR code data will cause issues, remember to fix here by avoiding QR code data
            if (section.content.length > 0) {
              section.content.forEach((content, index) => {
                that.$set(that.$data[name], index, content);
              });

              hasContent =
                Object.keys(section.content[0].body.content[0]).length > 1 ||
                section.content[0].body.content.length > 1;
            }

            that.$data.visiblity[name] = hasContent;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.loadPoster(parseInt(this.$route.params.id));
  }
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
