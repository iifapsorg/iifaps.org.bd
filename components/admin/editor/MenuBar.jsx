"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
  Link2,
} from "lucide-react";

const headingButtons = [
  {
    icon: Heading1,
    label: "Heading 1",
    level: 1,
  },
  {
    icon: Heading2,
    label: "Heading 2",
    level: 2,
  },
  {
    icon: Heading3,
    label: "Heading 3",
    level: 3,
  },
];

const ToolbarButton = ({
  icon: Icon,
  label,
  onClick,
  isActive = false,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`
        flex h-9 w-9 items-center justify-center
        rounded-md border transition-all duration-200
        ${
          isActive
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        }
        disabled:cursor-not-allowed
        disabled:opacity-40
      `}
    >
      <Icon size={18} />
    </button>
  );
};

const Divider = () => <div className="mx-1 h-6 w-px bg-gray-300" />;

const MenuBar = ({ editor, onOpenLinkPopup }) => {
  if (!editor) return null;

  return (
    <div className="sticky top-0 z-30 flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0  bg-gray-50 p-3 shadow-sm">

      {/* Undo / Redo */}
      <ToolbarButton
        icon={Undo2}
        label="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        icon={Redo2}
        label="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      />
      <Divider />
      {/* Text Style */}
      <ToolbarButton
        icon={Bold}
        label="Bold"
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={Italic}
        label="Italic"
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon={Underline}
        label="Underline"
        isActive={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <ToolbarButton
        icon={Strikethrough}
        label="Strike"
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <Divider />
      {/* Headings */}
      {headingButtons.map(({ icon, label, level }) => (
        <ToolbarButton
          key={level}
          icon={icon}
          label={label}
          isActive={editor.isActive("heading", { level })}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        />
      ))}

      <Divider />
      {/* Lists */}
      <ToolbarButton
        icon={List}
        label="Bullet List"
        isActive={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon={ListOrdered}
        label="Ordered List"
        isActive={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <Divider />
      {/* Quote */}
      <ToolbarButton
        icon={Quote}
        label="Block Quote"
        isActive={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      {/* Inline Code */}
      <ToolbarButton
        icon={Code2}
        label="Inline Code"
        isActive={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <Divider />
      {/* Text Align */}
      <ToolbarButton
        icon={AlignLeft}
        label="Align Left"
        isActive={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      />
      <ToolbarButton
        icon={AlignCenter}
        label="Align Center"
        isActive={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      />
      <ToolbarButton
        icon={AlignRight}
        label="Align Right"
        isActive={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      />

      <Divider />

      {/* link  */}
      <ToolbarButton
        icon={Link2}
        label="Insert Link"
        isActive={editor.isActive("link")}
        onClick={onOpenLinkPopup}
      />
    </div>
  );
};

export default MenuBar;
