"use client";

import TiptapEditor from "./TiptapEditor";

const BlogEditor = ({
  label = "Content",
  value = "",
  onChange,
  editable = true,
  required = false,
  error = "",
  className = "",
}) => {
  return (
    <div className={className}>
      {/* Label */}
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {/* Editor */}
      <TiptapEditor
        value={value}
        onChange={onChange}
        editable={editable}
      />

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default BlogEditor;