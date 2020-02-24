<template>
  <li class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move">
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full" :src="user.avatar" :alt="user.name" />
        <vue-inline-text-editor
          class="ml-2 text-gray-700 font-semibold font-sans tracking-wide"
          :value.sync="user.name"
          placeholder="Enter something here"
          close-on-blur
        ></vue-inline-text-editor>
    </div>
  </li>
</template>

<script>
import VueInlineTextEditor from "vue-inline-text-editor";

export default {
  name: "info-card",
  components: {
    VueInlineTextEditor
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>