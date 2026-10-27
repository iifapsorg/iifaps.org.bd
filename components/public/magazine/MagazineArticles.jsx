// MagazineArticles.jsx

import magazineConfig from "@/config/magazine/magazine.config";

export default function MagazineArticles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-15 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-bengali text-2xl font-bold text-foreground sm:text-3xl">
        শহীদ ওসমান হাদিকে স্মরণে ইতোমধ্যে যেসব লেখা এসেছে
      </h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {magazineConfig.articles.map(({ id, title, topics = [] }) => (
          <article
            key={id}
            className="group rounded-2xl border border-border bg-background p-5 shadow-md shadow-muted-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="font-bengali text-lg font-semibold leading-8 text-foreground transition-colors duration-300 group-hover:text-primary">
              {title}
            </h2>

            {/* {topics.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-md border border-border bg-muted px-3 py-1 font-bengali text-sm leading-6 text-muted-foreground"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            )} */}
          </article>
        ))}
      </div>
    </section>
  );
}
