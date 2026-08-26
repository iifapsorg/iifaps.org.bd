export default function BlogSeoFields({ form, onChange }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-semibold">SEO Settings</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Optimize your blog for search engines.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          name="metaTitle"
          label="Meta Title"
          value={form.metaTitle}
          onChange={onChange}
          placeholder="SEO title..."
        />

        <Field
          name="metaDescription"
          label="Meta Description"
          value={form.metaDescription}
          onChange={onChange}
          placeholder="SEO description..."
          textarea
        />
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  value,
  onChange,
  placeholder,
  textarea,
}) {
  const className =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={className}
        />
      ) : (
        <input
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}