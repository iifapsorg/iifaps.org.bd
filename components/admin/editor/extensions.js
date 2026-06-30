// src/components/admin/editor/extensions.js

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

const CustomLink = Link.extend({
  inclusive() {
    return false;
  },
}).configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
});

export const editorExtensions = [
  StarterKit,

  Placeholder.configure({
    placeholder: "Start writing your article...",
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  // ======== custom link =====
  CustomLink,
];
