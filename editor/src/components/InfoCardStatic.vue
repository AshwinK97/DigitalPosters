<template>
  <div class="p-4 mb-3 bg-white justify-between items-center shadow rounded-lg">
    <div class="flex items-center flex-col w-full">
      <editor-content :editor="editor" class="w-full px-6 pb-4 text-left text-xl" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Heading,
  Link,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
  Image,
  OrderedList,
  BulletList,
  ListItem
} from "tiptap-extensions";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  Link2Icon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Trash2Icon,
  ListIcon
} from "vue-feather-icons";

export default {
  name: "info-card-static",
  components: {
    EditorContent,
    EditorMenuBar,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    Link2Icon,
    ArrowLeftIcon,
    ArrowRightIcon,
    Trash2Icon,
    ListIcon
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
        editable: false,
        content: ``,
        extensions: [
          new Heading({ levels: [1, 2, 3] }),
          new Link(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new OrderedList(),
          new BulletList(),
          new ListItem()
        ],
      }),
      json: this.box.body
    };
  },
  watch: {
    box() {
      this.json = this.box.body;
      this.editor.setContent(this.json);
    }
  },
  mounted() {
    this.json = this.box.body;
    this.editor.setContent(this.json, true);
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  }
};
</script>

<style lang="scss" scoped>
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;

.menubar {
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba($color-black, 0.05);
    }

    &.is-active {
      background-color: rgba($color-black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
</style>