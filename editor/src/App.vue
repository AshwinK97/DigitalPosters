<template>
  <div id="app" class="min-h-screen w-screen flex flex-col pt-16 px-16">
    <modal class="rounded" name="onSave">
      <div
        class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
        role="alert"
      >
        <p class="font-bold">Informational message</p>
        <p class="text-sm">You are about to save the contents of this poster! Please check the data.</p>
      </div>
      <div class="text-green-700 p-8">
        <p class="text-base">{{allPosterData}}</p>
      </div>
    </modal>
    <modal name="onLoad">hello, world!</modal>
    <div class="w-full flex justify-between items-center">
      <h1>Digital Posters</h1>
      <div>
        <button
          @click="onSave()"
          class="mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >Save</button>
        <button
          @click="onLoad"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >Load</button>
      </div>
    </div>
    <div id="header" class="flex mb-4">
      <div class="text-center w-full">
        <draggable
          class="w-full px-4"
          ghost-class="moving-card"
          filter=".action-button"
          :list="header"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in header"
            :key="box.id"
            :box="box"
            @on-delete="onDelete(header, index)"
          ></info-card>
        </draggable>
      </div>
    </div>
    <div id="body" class="flex mb-4">
      <div class="text-center w-1/3">
        <draggable
          class="w-full px-4"
          group="all-users"
          ghost-class="moving-card"
          filter=".action-button"
          :list="posterColOne"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in posterColOne"
            :key="box.id"
            :box.sync="box"
            @on-delete="onDelete(posterColOne, index)"
          ></info-card>
          <div
            @click="onAdd(posterColOne)"
            class="p-4 mb-3 bg-white shadow rounded-lg flex justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
      <div class="text-center w-1/3">
        <draggable
          class="w-full px-4"
          group="all-users"
          ghost-class="moving-card"
          filter=".action-button"
          :list="posterColTwo"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in posterColTwo"
            :key="box.id"
            :box="box"
            @on-delete="onDelete(posterColTwo, index)"
          ></info-card>
          <div
            @click="onAdd(posterColTwo)"
            class="p-4 mb-3 bg-white shadow rounded-lg flex justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
      <div class="text-center w-1/3">
        <draggable
          class="w-full px-4"
          group="all-users"
          ghost-class="moving-card"
          filter=".action-button"
          :list="posterColThree"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in posterColThree"
            :key="box.id"
            :box.sync="posterColThree[index]"
            @on-delete="onDelete(posterColThree, index)"
            @on-change="onChange($event, posterColThree, index)"
          ></info-card>
          <div
            @click="onAdd(posterColThree)"
            class="p-4 mb-3 bg-white shadow rounded-lg flex justify-center items-center w-full text-gray-500 hover:text-gray-700"
          >
            <PlusCircleIcon size="54" class="p-1 focus:shadow-outline" />
          </div>
        </draggable>
      </div>
    </div>
    <div id="footer" class="flex mb-4">
      <div class="text-center w-full">
        <draggable
          class="w-full px-4"
          ghost-class="moving-card"
          filter=".action-button"
          :list="footer"
          :animation="200"
        >
          <info-card
            v-for="(box, index) in footer"
            :key="box.id"
            :box="box"
            @on-delete="onDelete(footer, index)"
          ></info-card>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import "./assets/css/tailwind.css";

import Draggable from "vuedraggable";
import { Trash2Icon, PlusCircleIcon } from "vue-feather-icons";

import InfoCard from "./components/InfoCard";

export default {
  name: "app",
  components: {
    PlusCircleIcon,
    Trash2Icon,
    Draggable,
    InfoCard
  },
  data() {
    return {
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
    onDelete(list, index) {
      list.splice(index, 1);
    },
    onChange(box, list, index) {
      list[index] = box;
    },
    onAdd(list) {
      list.push({ id: this.generateId() });
    },
    onSave() {
      this.$modal.show("onSave");
    },
    onLoad() {
      this.$set(this.posterColThree, 0, {
        id: "pyng271w9",
        body: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: { level: 2 },
              content: [{ type: "text", text: "Hi!" }]
            }
          ]
        }
      });

      // this.posterColThree[0] = {
      //   id: "pyng271w9",
      //   body: {
      //     type: "doc",
      //     content: [
      //       {
      //         type: "heading",
      //         attrs: { level: 2 },
      //         content: [{ type: "text", text: "Hi!" }]
      //       }
      //     ]
      //   }
      // };
      // this.$modal.show("onLoad");
    },
    generateId() {
      return Math.random()
        .toString(36)
        .substr(2, 9);
    }
  },
  computed: {
    allPosterData() {
      const headerData = [
        {
          name: "header",
          content: this.header.map(box => (box))
        }
      ];
      const posterColOneData = [
        {
          name: "posterColOne",
          content: this.posterColOne.map(box => (box))
        }
      ];
      const posterColTwoData = [
        {
          name: "posterColTwo",
          content: this.posterColTwo.map(box => (box))
        }
      ];
      const posterColThreeData = [
        {
          name: "posterColThree",
          content: this.posterColThree.map(box => (box))
        }
      ];
      const footerData = [
        {
          name: "footer",
          content: this.footer.map(box => (box))
        }
      ];

      const allPosterData = headerData.concat(
        posterColOneData,
        posterColTwoData,
        posterColThreeData,
        footerData
      );

      return allPosterData;
    }
  }
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
