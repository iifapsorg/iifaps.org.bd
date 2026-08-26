"use client";

import { FolderTree, Pencil, FolderOpen } from "lucide-react";
import React, { useState } from "react";
import Text from "../../shared/Text";
import Link from "next/link";
import DeleteCategoryButton from "./DeleteCategoryButton";
import EmptyCategory from "./EmptyCategory";

const AdminCategoryItem = ({ categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.[0] || null,
  );

  const subCategories = selectedCategory?.children || [];

  return (
    <div>
      {categories?.length > 0 ? (
        <div className="overflow-x-auto">
          {/* ================= HEADER ================= */}
          <div className="w-full min-w-175 bg-muted/40 grid grid-cols-2 text-center font-bold capitalize border-b border-border">
            <Text className="border-r border-border py-3">Categories</Text>

            <Text className="py-3">Sub Categories</Text>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="w-full min-w-175 bg-muted/40 grid grid-cols-2 gap-6 p-3">
            {/* ================= LEFT : CATEGORIES ================= */}
            <div className="bg-background border border-border shadow-sm rounded-lg overflow-hidden">
              {categories.map((category) => {
                const isSelected = selectedCategory?._id === category._id;

                return (
                  <div
                    key={category._id}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-4 py-3
                      flex items-center justify-between
                      cursor-pointer
                      border-b border-border last:border-b-0
                      transition-all duration-200
                      ${
                        isSelected ? "bg-gray-600 text-white" : "hover:bg-muted"
                      }
                    `}
                  >
                    {/* Category name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <FolderTree
                        className={`h-4 w-4 shrink-0 ${
                          isSelected ? "text-white" : "text-muted-foreground"
                        }`}
                      />

                      <p className="font-medium capitalize truncate">
                        {category.name}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/categories/edit/${category._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`
                          flex items-center justify-center gap-2
                          px-3 py-1.5
                          rounded-md
                          outline
                          transition-colors duration-200
                          ${
                            isSelected
                              ? "outline-background/30 hover:bg-background/10"
                              : "outline-border hover:bg-green-900 hover:text-white hover:outline-transparent"
                          }
                        `}
                      >
                        <Pencil className="h-3.5 w-3.5" />

                        <span className="hidden lg:block text-xs">Edit</span>
                      </Link>

                      <DeleteCategoryButton
                        categoryId={category._id}
                        categoryName={category.name}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= RIGHT : SUB CATEGORIES ================= */}
            <div className="bg-background border border-border shadow-sm rounded-lg overflow-hidden min-h-62.5">
              {selectedCategory ? (
                <>
                  {/* Selected category heading */}
                  <div className="px-5 py-4 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Sub categories of
                        </p>

                        <h3 className="font-semibold capitalize">
                          {selectedCategory.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Sub categories */}
                  {subCategories.length > 0 ? (
                    <div className="divide-y divide-border">
                      {subCategories.map((subCategory) => (
                        <div
                          key={subCategory._id}
                          className="px-5 py-3 flex items-center justify-between hover:bg-muted transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground" />

                            <p className="font-medium capitalize">
                              {subCategory.name}
                            </p>
                          </div>

                          {/* Sub-category actions */}
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/categories/edit/${subCategory._id}`}
                              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md outline outline-border hover:bg-green-900 hover:text-white hover:outline-transparent transition-colors duration-200"
                            >
                              <Pencil className="h-3.5 w-3.5" />

                              <span className="hidden lg:block text-xs">
                                Edit
                              </span>
                            </Link>

                            <DeleteCategoryButton
                              categoryId={subCategory._id}
                              categoryName={subCategory.name}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* ================= NO CHILDREN ================= */
                    <EmptyCategory
                      type="sub-category"
                      title="No sub-categories"
                      text=" doesn't have any sub-categories yet."
                      btnText="Add Sub-category"
                      selectedCategory={selectedCategory}
                    />
                  )}
                </>
              ) : (
                /* ================= NOTHING SELECTED ================= */
                <div className="flex min-h-62.5 flex-col items-center justify-center px-6 text-center">
                  <FolderTree className="h-8 w-8 text-foreground/30" />

                  <Text variant="title" className="mt-4">
                    Select a category
                  </Text>

                  <Text variant="mediumText" className="mt-1 max-w-sm text-sm">
                    Select a category from the left to view its sub-categories.
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ================= EMPTY CATEGORIES ================= */
        <EmptyCategory></EmptyCategory>
      )}
    </div>
  );
};

export default AdminCategoryItem;
