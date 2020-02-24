<template>
  <div id="app" class="min-h-screen w-screen bg-gray-200 flex items-center justify-center">
    <div class="w-full max-w-md text-center px-3">
      <p class="mb-2 text-gray-700 font-semibold font-sans tracking-wide">List 1</p>
      <draggable
        tag="ul"
        group="all-users"
        class="draggable-list"
        ghost-class="moving-card"
        filter=".action-button"
        :list="users"
        :animation="200"
      >
        <editor
          v-for="(user, index) in users"
          :key="user.id"
          :active="user.id === activeCard"
          :component="user"
          @on-colour-change="onColourChange(users, index, selectedColour)"
          @on-close="onClose"
          @on-delete="onDelete(users, index)"
        >
          <info-card
            :user="user"
            @on-edit="onEdit"
            @on-delete="onDelete"
            @click.native="toggleActiveCard(user)"
          ></info-card>
        </editor>
      </draggable>
    </div>

    <div class="w-full max-w-md md:ml-6 text-center px-3">
      <p class="mb-2 text-gray-700 font-semibold font-sans tracking-wide">List 2</p>
      <draggable
        tag="ul"
        group="all-users"
        class="draggable-list"
        ghost-class="moving-card"
        filter=".action-button"
        :list="newUsers"
        :animation="200"
      >
        <editor
          v-for="(user, index) in newUsers"
          :key="user.id"
          :active="user.id === activeCard"
          :component="user"
          @on-colour-change="onColourChange"
          @on-close="onClose"
          @on-delete="onDelete(newUsers, index)"
        >
          <info-card
            :user="user"
            @on-edit="onEdit"
            @on-delete="onDelete"
            @click.native="toggleActiveCard(user)"
          ></info-card>
        </editor>
      </draggable>
    </div>
  </div>
</template>

<script>
import "./assets/css/tailwind.css";

import Draggable from "vuedraggable";
import { EditIcon, Trash2Icon } from "vue-feather-icons";

import InfoCard from "./components/InfoCard";
import Editor from "./components/Editor";

export default {
  name: "app",
  components: {
    EditIcon,
    Trash2Icon,
    Draggable,
    InfoCard,
    Editor
  },
  data() {
    return {
      activeCard: "",
      users: [
        {
          id: 1,
          name: "Adrian Schubert",
          backgroundColor: "#fff",
          avatar:
            "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        },
        {
          id: 2,
          name: "Violet Gates",
          backgroundColor: "#fff",
          avatar: "https://pickaface.net/gallery/avatar/freud51c8b3f65e7dc.png"
        },
        {
          id: 3,
          name: "Steve Jobs",
          backgroundColor: "#fff",
          avatar: "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png"
        },
        {
          id: 4,
          name: "Yassine Smith",
          backgroundColor: "#fff",
          avatar:
            "https://pickaface.net/gallery/avatar/unr_yassine_191124_2012_3gngr.png"
        },
        {
          id: 5,
          name: "Senior Saez",
          backgroundColor: "#fff",
          avatar:
            "https://pickaface.net/gallery/avatar/elmedinilla541c03412955c.png"
        }
      ],
      newUsers: [
        {
          id: 6,
          name: "Steve Jobs",
          backgroundColor: "#fff",
          avatar: "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png"
        },
        {
          id: 7,
          name: "Yassine Smith",
          backgroundColor: "#fff",
          avatar:
            "https://pickaface.net/gallery/avatar/unr_yassine_191124_2012_3gngr.png"
        },
        {
          id: 8,
          name: "Senior Saez",
          backgroundColor: "#fff",
          avatar:
            "https://pickaface.net/gallery/avatar/elmedinilla541c03412955c.png"
        },
        {
          id: 9,
          name: "Adrian Schubert",
          backgroundColor: "#fff",
          avatar:
            "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        },
        {
          id: 10,
          name: "Violet Gates",
          backgroundColor: "#fff",
          avatar: "https://pickaface.net/gallery/avatar/freud51c8b3f65e7dc.png"
        }
      ]
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
    },
    onColourChange(list, index, colour) {
      list[index].backgroundColor = "#fefefe";
    },
    toggleActiveCard(card) {
      this.activeCard = card.id;
    }
  }
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
