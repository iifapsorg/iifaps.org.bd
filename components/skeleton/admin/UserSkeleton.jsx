const UserSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl border bg-muted/30" />
        ))}
      </div>
      <div className="h-64 rounded-xl border bg-muted/20" />
    </div>
  );
};

export default UserSkeleton;
