const MagazineCardSkeleton = () => {
  const skeletonItems = [
    ["w-full", "w-4/5"],
    ["w-full", "w-5/6"],
    ["w-full", "w-3/4"],
    ["w-2/5"],
    ["w-4/5"],
    ["w-3/5"],
    ["w-full", "w-3/4"],
    ["w-5/6", "w-2/3"],
    ["w-full", "w-4/5"],
    ["w-4/5"],
    ["w-full"],
    ["w-3/5"],
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skeletonItems.map((lines, index) => (
        <article
          key={index}
          className="flex min-h-27.5 animate-pulse flex-col justify-center gap-4 overflow-hidden rounded-[28px] border border-border bg-background p-7 shadow-md sm:min-h-32.5"
        >
          <div className="space-y-3">
            {lines.map((width, lineIndex) => (
              <div
                key={lineIndex}
                className={`h-5 ${width} rounded-md bg-muted`}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default MagazineCardSkeleton;
