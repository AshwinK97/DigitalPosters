<template>
  <div class="relative">
    <div
      v-show="active"
      class="h-full w-full absolute"
      :class="{'border-4 border-teal-400 ': active}"
    >
      <div class="flex justify-end items-center p-4 mb-3">
        <button
          aria-label="Delete card"
          @click="$emit('on-delete')"
          class="p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600 action-button"
        >
          <Trash2Icon />
        </button>
        <button
          aria-label="Close Edit"
          @click="$emit('on-close')"
          class="p-1 focus:outline-none focus:shadow-outline text-gray-500 hover:text-gray-600 action-button"
        >
          <XSquareIcon />
        </button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { XSquareIcon, Trash2Icon } from "vue-feather-icons";

export default {
  components: {
    XSquareIcon,
    Trash2Icon
  },
  props: {
    active: Boolean,
    component: Object
  }
};
</script>