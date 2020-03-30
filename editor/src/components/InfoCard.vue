<template>
  <div class="p-4 mb-3 bg-white justify-between items-center shadow rounded-lg">
    <Trash2Icon
      v-if="!preview"
      @click="$emit('on-delete')"
      size="2x"
      class="p-1 focus:shadow-outline text-red-500 hover:text-red-600"
    />
    <div class="flex items-center flex-col w-full">
      <editor-menu-bar v-if=" name === ''" :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <bold-icon />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <italic-icon />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <underline-icon />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <list-icon />
          </button>

          <!-- <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <icon name="ol" />
          </button>-->

          <button class="menubar__button" @click="commands.undo">
            <rotate-ccw-icon />
          </button>

          <button class="menubar__button" @click="commands.redo">
            <rotate-cw-icon />
          </button>
        </div>
      </editor-menu-bar>
      <editor-menu-bar
        v-if="menu && name === 'logo'"
        :editor="editor"
        v-slot="{ commands }"
      >
        <div class="menubar">
          <button class="menubar__button" @click="commands.undo">
            <rotate-ccw-icon />
          </button>

          <button class="menubar__button" @click="commands.redo">
            <rotate-cw-icon />
          </button>
        </div>
      </editor-menu-bar>
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
  RotateCcwIcon,
  RotateCwIcon,
  Trash2Icon,
  ListIcon
} from "vue-feather-icons";

export default {
  name: "info-card",
  components: {
    EditorContent,
    EditorMenuBar,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    Link2Icon,
    RotateCcwIcon,
    RotateCwIcon,
    Trash2Icon,
    ListIcon
  },
  props: {
    box: {
      type: Object,
      default: () => ({})
    },
    preview: {
      type: Boolean,
      default: () => false
    },
    name: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      // Create an `Editor` instance with some default content. The editor is
      // then passed to the `EditorContent` component as a `prop`
      editor: new Editor({
        editable: true,
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
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
        onUpdate: ({ getJSON }) => {
          this.json = getJSON();
        },
        // onBlur: () => {
        //   this.menu = false;
        // },
        onFocus: () => {
          this.menu = true;
        }
      }),
      json: this.box.body,
      menu: true //flip to default false if trying to make onFocus menus
    };
  },
  watch: {
    json(content) {
      this.$emit("on-change", { id: this.box.id, body: content });
      localStorage[this.box.id] = JSON.stringify(content);
    },
    box() {
      this.json = this.box.body;
      this.editor.setContent(this.json);
    },
    preview() {
      this.editor.setOptions({
        editable: !this.preview
      });
    }
  },
  methods: {
    setMenuVisible(value) {
      this.menu = value;
    }
  },
  mounted() {
    this.json = this.box.body;
    this.editor.editable = this.preview;
    this.editor.setContent(this.json, true);
    if (localStorage[this.box.id] !== undefined) {
      // you can pass a json document
      this.editor.setContent(JSON.parse(localStorage[this.box.id]), true);
    }

    this.editor.setOptions({
      editable: !this.preview
    });

    if (name === "logo") {
      this.editor.setOptions({
        extensions: [new Image(), new History()]
      });
    }
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