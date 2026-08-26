import React from "react";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import { FolderOpen, FolderTree } from "lucide-react";
import Link from "next/link";

const EmptyCategory = ({
  type = "category",
  selectedCategory,
  title = "No categories yet",
  text = "Create your first category to start organizing your blog content.",
  href = "/admin/categories/create",
  btnText = "Create your first category",
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted shadow-sm">
        {type === "category" ? (
          <FolderTree className="h-6 w-6 text-foreground/40" />
        ) : (
          <FolderOpen className="h-5 w-5 text-foreground/40" />
        )}
      </div>

      <Text variant="title" className="mt-5 text-lg">
        {title}
      </Text>

      {type === "category" ? (
        <Text
          variant="mediumText"
          className="mx-auto mt-2 max-w-sm text-center"
        >
          {text}
        </Text>
      ) : (
        <Text
          variant="mediumText"
          className="mx-auto mt-2 max-w-sm text-center"
        >
          <span className="capitalize font-bold">
            {selectedCategory?.name} category
          </span>
          {text}
        </Text>
      )}

      <Link href={href} className="mt-6">
        <Button className="capitalize">{btnText}</Button>
      </Link>
    </div>
  );
};

export default EmptyCategory;
