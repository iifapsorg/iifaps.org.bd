export default function UserFormActions({
  loading,
  isEdit,
  onCancel,
}) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEdit
            ? "Update User"
            : "Create User"}
      </button>
    </div>
  );
}