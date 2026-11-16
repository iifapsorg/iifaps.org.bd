import Container from "@/components/shared/Container";
import MagazineCardSkeleton from "@/components/skeleton/public/MagazineCardSkeleton";

const Loading = () => {
  return (
    <Container>
      <div className="mt-25 grid items-center justify-center gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <MagazineCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
};

export default Loading;
