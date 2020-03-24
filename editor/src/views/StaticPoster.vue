<template>
  <div id="static-poster">
    <div class="w-full flex justify-between items-center">
      <h1>Digital Posters</h1>
    </div>
    <div id="header" class="flex-col mb-4">
      <div class="text-center w-full">
        <div class="w-full px-4">
          <info-card
            v-for="(box, index) in header"
            :key="box.id"
            :box="header[index]"
            :preview="preview"
          ></info-card>
        </div>
      </div>
      <div class="flex flex-col md:flex-row text-center w-full">
        <div class="text-center w-full md:w-1/6 px-4">
          <info-card :key="logo.id" :box="logo[0]" :preview="preview"></info-card>
        </div>
        <div class="text-center w-full md:w-2/3 px-4">
          <info-card
            :key="credits.id"
            :box="credits[0]"
            :preview="preview"
            @on-change="onChange($event, credits)"
          ></info-card>
        </div>
        <div class="text-center w-full md:w-1/6 px-4">
          <info-card :key="qr.id" :box="qr[0]" :preview="preview"></info-card>
        </div>
      </div>
    </div>
    <div id="body" class="flex flex-col lg:flex-row mb-4">
      <div class="text-center w-full md:w-1/3">
        <div class="w-full px-4">
          <info-card
            v-for="(box, index) in posterColOne"
            :key="box.id"
            :box="posterColOne[index]"
            :preview="preview"
          ></info-card>
        </div>
      </div>
      <div class="text-center w-full md:w-1/3">
        <div class="w-full px-4">
          <info-card
            v-for="(box, index) in posterColTwo"
            :key="box.id"
            :box="posterColTwo[index]"
            :preview="preview"
          ></info-card>
        </div>
      </div>
      <div class="text-center w-full md:w-1/3">
        <div class="w-full px-4">
          <info-card
            v-for="(box, index) in posterColThree"
            :key="box.id"
            :box="posterColThree[index]"
            :preview="preview"
          ></info-card>
        </div>
      </div>
    </div>
    <div id="footer" class="flex mb-4">
      <div class="text-center w-full">
        <div class="w-full px-4">
          <info-card
            v-for="(box, index) in footer"
            :key="box.id"
            :box="footer[index]"
            :preview="preview"
          ></info-card>
        </div>
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
  name: "static-poster",
  components: {
    PlusCircleIcon,
    Trash2Icon,
    Draggable,
    InfoCard
  },
  data() {
    return {
      preview: true,
      userID: 1,
      posterID: 1,
      header: [
        {
          id: "yle0mxm4q",
          body: {
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: { level: 2 },
                content: [{ type: "text", text: "Hi there," }]
              }
            ]
          }
        }
      ],
      logo: [
        {
          id: "1234546",
          body: {
            type: "doc",
            content: []
          }
        }
      ],
      credits: [
        {
          id: "12asdf46",
          body: {
            type: "doc",
            content: []
          }
        }
      ],
      qr: [
        {
          id: "kj23jk4",
          body: {
            type: "doc",
            content: []
          }
        }
      ],
      posterColOne: [
        {
          id: "kn0x8hwy0",
          body: {
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: { level: 2 },
                content: [{ type: "text", text: "Hi there," }]
              },
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "this is a very " },
                  { type: "text", marks: [{ type: "italic" }], text: "basic" },
                  { type: "text", text: " exampp." }
                ]
              },
              {
                type: "paragraph",
                content: [{ type: "text", text: "body { display: none;" }]
              },
              {
                type: "paragraph",
                content: [{ type: "text", text: " A  list" }]
              },
              {
                type: "paragraph",
                content: [{ type: "text", text: " With regular items" }]
              },
              {
                type: "paragraph",
                content: [{ type: "text", text: " It's amazing 👏 – mom" }]
              }
            ]
          }
        }
      ],
      posterColTwo: [
        {
          id: "t1swg2t3l",
          body: {
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: { level: 2 },
                content: [{ type: "text", text: "Hi there," }]
              }
            ]
          }
        }
      ],
      posterColThree: [
        {
          id: "pyng271w9",
          body: {
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: { level: 2 },
                content: [{ type: "text", text: "Hi there," }]
              }
            ]
          }
        }
      ],
      footer: [
        {
          id: "ocfmvpdbw",
          body: {
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: { level: 2 },
                content: [{ type: "text", text: "Hi there," }]
              }
            ]
          }
        }
      ]
    };
  },
  methods: {
    loadPoster(posterData) {
      const that = this;
      axios
        .post(config.serverUrl + "/loadPoster", { userID: this.userID })
        .then(function(response) {
          const posterData = response.data;
          console.log(posterData);
          posterData.forEach(section => {
            const name = section.name;

            section.content.forEach((content, index) => {
              this.$set(this.$data[name], index, content);
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.loadPoster(loadData.poster.content);
  }
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
