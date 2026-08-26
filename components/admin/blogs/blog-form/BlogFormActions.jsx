import Button from "@/components/shared/Button";

export default function BlogFormActions({ loading, isEdit, onCancel }) {
  return (
    <div className="flex gap-3 pt-3">
      <Button disabled={loading} type="submit" variant="success">
        {loading ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
      </Button>

      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}
