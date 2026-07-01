"use client";

import { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "./extensions";
import MenuBar from "./MenuBar";
import LinkPopup from "./LinkPopup";
import { ScrollProvider } from "@/components/providers/ScrollProvider";


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

  const [linkOpen, setLinkOpen] = useState(false);

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
        prose max-w-none
        h-[80vh]
        overflow-y-hidden
        rounded-xl
        border
        border-gray-300
        bg-white
        shadow-sm
        ${className}
      `}
    >
      <MenuBar editor={editor} onOpenLinkPopup={() => setLinkOpen(true)} />

      {/* <EditorContent editor={editor} /> */}
      <ScrollProvider className="h-[calc(100%-100px)] overflow-y-auto">
        <EditorContent editor={editor} />
      </ScrollProvider>

      <LinkPopup
        open={linkOpen}
        onClose={() => setLinkOpen(false)}
        onSubmit={(url) => {
          if (!url) {
            editor.chain().focus().unsetLink().run();
            setLinkOpen(false);
            return;
          }

          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        }}
      />
    </div>
  );
};

export default TiptapEditor;
