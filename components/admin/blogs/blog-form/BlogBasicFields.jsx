import { BlogEditor } from "@/components/admin/editor";

const INPUT_CLASS =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function BlogBasicFields({ form, onChange }) {
  return (
    <section className="space-y-5">
      <SectionTitle
        title="Basic Information"
        description="Add the main information about your blog."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          name="title"
          label="Title"
          value={form.title}
          onChange={onChange}
          required
          placeholder="Enter blog title..."
          className="md:col-span-2"
        />

        {/* <Field
          name="author"
          label="Author"
          value={form.author}
          onChange={onChange}
          placeholder="Author name..."
        /> */}

        <Field
          name="summary"
          label="Summary"
          value={form.summary}
          onChange={onChange}
          placeholder="Write a short summary..."
          textarea
          className="md:col-span-2"
        />
      </div>

      <BlogEditor
        label="Content"
        value={form.content}
        onChange={(content) =>
          onChange({
            target: {
              name: "content",
              value: content,
            },
          })
        }
        required
      />

      <Field
        name="tags"
        label="Tags"
        value={form.tags}
        onChange={onChange}
        placeholder="Quranic Stories, Islamic History, Quran and Reflection..."
      />
    </section>
  );
}

function Field({
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
  textarea,
  className = "",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          rows={3}
          placeholder={placeholder}
          className={INPUT_CLASS}
        />
      ) : (
        <input
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={INPUT_CLASS}
        />
      )}
    </div>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div>
      <h2 className="font-semibold">{title}</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}