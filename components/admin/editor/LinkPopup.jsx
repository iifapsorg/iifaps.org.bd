"use client";

import { useState, useEffect } from "react";

const LinkPopup = ({ open, onClose, onSubmit, initialValue = "" }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(initialValue);
  }, [initialValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">Insert Link</h2>

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
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit(url);
              onClose();
            }}
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