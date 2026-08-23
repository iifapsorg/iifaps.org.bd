// /admin/page

import React from "react";
import { Construction } from "lucide-react";

const page = () => {
  return (
    <div className="lg:h-full flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 p-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-800 bg-background">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <Construction className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        </div>

        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
          Content is coming soon
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          This dashboard is currently being prepared. New content and features
          will be available here soon.
        </p>

        <div className="mx-auto mt-7 h-px w-16 bg-gray-200 dark:bg-gray-800" />

        <p className="mt-5 text-xs font-medium uppercase tracking-wider text-gray-400">
          Stay tuned
        </p>
      </div>
    </div>
  );
};

export default page;
