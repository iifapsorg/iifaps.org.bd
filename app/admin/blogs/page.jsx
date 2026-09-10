// /admin/blogs/page.jsx

import Link from "next/link";
import { Plus, ExternalLink, Pencil, FileText } from "lucide-react";
import { Suspense } from "react";

import { getBlogs } from "@/services/blog.service";
import { formatShortDate } from "@/utils/formatDate";
import Text from "@/components/shared/Text";
import { cn } from "@/utils/cn";
import Button from "@/components/shared/Button";
import DeleteBlogButton from "@/components/admin/blogs/blog-action/DeleteBlogButton";
import Loading from "@/app/admin/blogs/loading";

const statusStyles = {
  published: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      {/* Header static component */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text variant="sectionHeading" className="mt-0 text-2xl md:text-3xl">
            Blogs
          </Text>

          <Text variant="mediumText" className="mt-2">
            Manage your published and draft Blogs.
          </Text>
        </div>

        <Link href="/admin/blogs/create">
          <Button>Add New Blog</Button>
        </Link>
      </div>

      {/* Dynamic Data Content Async Component */}
      <Suspense fallback={<Loading />}>
        <BlogsContent />
      </Suspense>
    </div>
  );
}

// Data Fetching Component
async function BlogsContent() {
  const blogsRes = await getBlogs({ limit: 30 });
  const allBlogs = blogsRes.blogs || [];

  // JS Array filtering
  const published = allBlogs.filter((blog) => blog.status === "published");
  const drafts = allBlogs.filter((blog) => blog.status === "draft");

  const stats = [
    {
      label: "Total Blogs",
      value: allBlogs.length,
      valueClass: "text-foreground",
    },
    {
      label: "Published",
      value: published.length,
      valueClass: "text-green-600",
    },
    {
      label: "Drafts",
      value: drafts.length,
      valueClass: "text-yellow-600",
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="mx-auto flex items-center justify-center">
        <div className="grid grid-cols-2 justify-center gap-4 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-md border border-border bg-background p-5 shadow-sm"
            >
              <Text variant="normalText" className="text-center">
                {stat.label}
              </Text>

              <p className={`mt-2 text-2xl font-bold ${stat.valueClass}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <FileText className="h-4 w-4 text-foreground/70" />
          </div>

          <div>
            <Text variant="title" className="mt-0 text-base">
              All Blogs
            </Text>
          </div>
        </div>

        {allBlogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Title
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Date
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {allBlogs.map((blog, index) => (
                  <tr
                    key={blog._id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    <td className="max-w-sm px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <p>{index + 1}</p>
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {blog.title}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground/60">
                        {blog.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1",
                          "text-xs font-medium capitalize",
                          statusStyles[blog.status] ||
                            "border-border bg-muted text-foreground/60",
                        )}
                      >
                        <span
                          className={cn(
                            "mr-1.5 h-1.5 w-1.5 rounded-full",
                            blog.status === "published"
                              ? "bg-green-500"
                              : "bg-yellow-500",
                          )}
                        />
                        {blog.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-foreground/50">
                      {formatShortDate(blog.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blogs/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md outline outline-border px-3 py-1.5 text-xs font-medium text-foreground/50 transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </Link>

                        <Link
                          href={`/admin/blogs/edit/${blog.slug}`}
                          className="flex items-center justify-center gap-2 rounded-md px-3 py-1.5 outline outline-border transition-colors duration-200 hover:bg-green-900 hover:text-white hover:outline-transparent"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="hidden text-xs lg:block">Edit</span>
                        </Link>

                        <DeleteBlogButton
                          blogSlug={blog.slug}
                          blogTitle={blog.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted shadow-sm">
              <FileText className="h-6 w-6 text-foreground/40" />
            </div>

            <Text variant="title" className="mt-5 text-lg">
              No blogs yet
            </Text>

            <Text
              variant="mediumText"
              className="mx-auto mt-2 max-w-sm text-center"
            >
              Start creating content and your blog posts will appear here.
            </Text>

            <Link
              href="/admin/blogs/create"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Create your first blog
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
