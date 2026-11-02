"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import UserBasicFields from "./UserBasicFields";
import UserFormActions from "./UserFormActions";
import { INITIAL_USER_FORM } from "./userForm.config";

export default function UserForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    ...INITIAL_USER_FORM,
    ...initialData,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* -----------------------------
   * HANDLE CHANGE
   * ----------------------------- */

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /* -----------------------------
   * SUBMIT
   * ----------------------------- */

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (!isEdit && !form.password) {
        throw new Error("Password is required.");
      }

      if (form.password && form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        ...(form.password && {
          password: form.password,
        }),
      };

      const url = isEdit ? `/api/users/${initialData._id}` : "/api/users";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Something went wrong.");
      }

      // Success
      setForm({
        name: "",
        email: "",
        role: "user",
        password: "",
        confirmPassword: "",
      });

      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save user.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <UserBasicFields form={form} onChange={handleChange} isEdit={isEdit} />

      <UserFormActions
        loading={loading}
        isEdit={isEdit}
        onCancel={() => router.back()}
      />
    </form>
  );
}
