import Image from "next/image";
import {
  ImagePlus,
  Upload,
  X,
} from "lucide-react";

export default function BlogThumbnail({
  thumbnail,
  uploading,
  onUpload,
  onRemove,
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-semibold">Thumbnail</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Upload an image for your blog.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-dashed border-border bg-muted/20">
        {thumbnail ? (
          <div className="relative aspect-video w-full max-w-3xl">
            <Image
              src={thumbnail}
              alt="Blog thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
              <span className="text-sm text-white">
                Thumbnail Preview
              </span>

              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center p-8 text-center hover:bg-muted/40">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              {uploading ? (
                <Upload className="h-6 w-6 animate-pulse text-primary" />
              ) : (
                <ImagePlus className="h-6 w-6 text-primary" />
              )}
            </div>

            <p className="font-medium">
              {uploading
                ? "Uploading..."
                : "Upload blog thumbnail"}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              PNG, JPG or WEBP
            </p>

            {!uploading && (
              <span className="mt-4 rounded-lg border px-4 py-2 text-sm">
                Choose Image
              </span>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              disabled={uploading}
              onChange={(e) =>
                onUpload(e.target.files?.[0])
              }
              className="hidden"
            />
          </label>
        )}
      </div>
    </section>
  );
}