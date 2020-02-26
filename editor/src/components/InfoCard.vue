<template>
  <div class="p-4 mb-3 bg-white justify-between items-center shadow rounded-lg cursor-move">
    <div class="flex items-center flex-col">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">Bold</button>
      </editor-menu-bar>
      <editor-content
        :editor="editor"
        class="ml-2 text-gray-700 font-semibold font-sans tracking-wide"
      />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  HardBreak,
  Heading,
  Image,
  Bold,
  Code,
  Italic
} from "tiptap-extensions";

export default {
  name: "info-card",
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    box: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // Create an `Editor` instance with some default content. The editor is
      // then passed to the `EditorContent` component as a `prop`
      editor: new Editor({
        editable: true,
        content: `<p>${this.box.id}</p>`,
        extensions: [new Bold(), new Image()]
      })
    };
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  }
};
</script>