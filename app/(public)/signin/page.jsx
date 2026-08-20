// signin/page

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { inputFields } from "@/config/signin/signin.config";
import Text from "@/components/shared/Text";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      // success redirect to admin
      router.replace("/admin");
    } catch (err) {
      setError("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg bg-background border-2 border-border p-6 shadow-lg">
        <Text variant="sectionHeading" className="text-center my-5">
          Admin Sign In
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-lg  font-medium">
                {field.label}
              </label>

              <div className="relative">
                <Input
                  placeholder={field.placeholder}
                  type={
                    field.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field.type
                  }
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />

                {field.name === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-[80%] flex mt-10 mb-5 mx-auto disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
