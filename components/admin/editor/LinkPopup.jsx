"use client";

import { useState } from "react";

const LinkPopup = ({
  open,
  onClose,
  onSubmit,
  initialValue = "",
}) => {
  const [url, setUrl] = useState(initialValue);

  if (!open) return null;

  const handleApply = () => {
    onSubmit(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">
          Insert Link
        </h2>

        <input
          autoFocus
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkPopup;