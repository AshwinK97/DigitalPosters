<template>
  <div id="app" class="min-h-screen w-screen bg-gray-200 flex flex-col pt-16 px-16">
    <div id="header" class="flex mb-4">
      <div class="text-center w-full">
        <draggable
          class="w-full px-4"
          ghost-class="moving-card"
          filter=".action-button"
          :list="header"
          :animation="200"
        >
          <info-card v-for="(box, index) in header" :key="box.id" :box="box" @on-delete="onDelete(header, index)"></info-card>
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
          <info-card v-for="(box, index) in posterColOne" :key="box.id" :box="box" @on-delete="onDelete(posterColOne, index)"></info-card>
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
          <info-card v-for="(box, index) in posterColTwo" :key="box.id" :box="box" @on-delete="onDelete(posterColTwo, index)"></info-card>
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
          <info-card v-for="(box, index) in posterColThree" :key="box.id" :box="box" @on-delete="onDelete(posterColThree, index)"></info-card>
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
          <info-card v-for="(box, index) in footer" :key="box.id" :box="box" @on-delete="onDelete(footer, index)"></info-card>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import "./assets/css/tailwind.css";

import Draggable from "vuedraggable";
import { EditIcon, Trash2Icon } from "vue-feather-icons";

import InfoCard from "./components/InfoCard";

export default {
  name: "app",
  components: {
    EditIcon,
    Trash2Icon,
    Draggable,
    InfoCard
  },
  data() {
    return {
      activeCard: "",
      header: [{ id: 1 }],
      posterColOne: [{ id: 1 }, { id: 2 }],
      posterColTwo: [{ id: 3 }, { id: 4 }],
      posterColThree: [{ id: 5 }, { id: 6 }],
      footer: [{ id: 1 }]
    };
  },
  methods: {
    onEdit(user) {
      alert(`Editing ${user.name}`);
    },
    onDelete(list, index) {
      list.splice(index, 1);
      this.onClose();
    },
    onClose() {
      this.activeCard = "";
    }
  }
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
