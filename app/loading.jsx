const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 dark:bg-black dark:text-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>

      <h2 className="text-xl font-semibold">
        Loading...
      </h2>

      <p className="text-gray-500">
        Please wait while we load the content.
      </p>
    </div>
  );
};

export default Loading;