import Container from "@/components/shared/Container";
import BlogCardSkeleton from "@/components/skeleton/BlogCardSkeleton";

const Loading = () => {
  return (
    <Container>
      <div className="mt-25 grid items-center justify-center gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
};

export default Loading;
