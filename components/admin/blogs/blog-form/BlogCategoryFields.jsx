const INPUT_CLASS =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50";

export default function BlogCategoryFields({
  form,
  categories,
  subCategories,
  onChange,
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-semibold">Classification</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Organize your blog with categories and publishing status.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Select
          name="category"
          label="Category"
          value={form.category}
          onChange={onChange}
          required
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select
          name="subCategory"
          label="Sub Category"
          value={form.subCategory}
          onChange={onChange}
          disabled={!form.category || !subCategories.length}
        >
          <option value="">
            {!form.category
              ? "Select category first"
              : subCategories.length
                ? "Select sub-category"
                : "No sub-categories"}
          </option>

          {subCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select
          name="status"
          label="Status"
          value={form.status}
          onChange={onChange}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
      </div>

      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4">
        <div>
          <p className="font-medium">Featured Blog</p>

          <p className="text-sm text-muted-foreground">
            Mark this blog as featured.
          </p>
        </div>

        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={onChange}
          className="h-5 w-5"
        />
      </label>
    </section>
  );
}

function Select({
  name,
  label,
  value,
  onChange,
  required,
  disabled,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={INPUT_CLASS}
      >
        {children}
      </select>
    </div>
  );
}