// src/components/admin/editor/extensions.js

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
console.log(StarterKit);

export const editorExtensions = [
  StarterKit,

  Placeholder.configure({
    placeholder: "Start writing your article...",
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];
