"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import { editorExtensions } from "./extensions";
import MenuBar from "./MenuBar";

const TiptapEditor = ({
  value = "",
  onChange,
  editable = true,
  className = "",
}) => {
  const editor = useEditor({
    extensions: editorExtensions,

    content: value,

    editable,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class: `prose prose-lg max-w-none min-h-[450px] p-6 focus:outline-none`,
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Sync external value (Edit Blog page support)
  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (currentContent !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  return (
    <div
      className={`
        overflow-hidden
        rounded-xl
        border
        border-gray-300
        bg-white
        shadow-sm
        ${className}
      `}
    >
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
