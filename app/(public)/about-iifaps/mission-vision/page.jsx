import React from "react";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";

const page = () => {
  return (
    <section>
      <Container>
        {/* ==== mission == */}
        <div className="">
          <Text variant="sectionHeading" className="mx-auto text-center">
            Mission
          </Text>

          <Text className="mt-10 text-justify">
            To promote rigorous academic research in Islamic intellectual
            traditions while fostering critical thinking, intellectual dialogue,
            and interdisciplinary scholarship.
          </Text>
        </div>

        {/* ==== Vision == */}
        <div className="mt-15">
          <Text variant="sectionHeading" className="mx-auto text-center">
            Vision
          </Text>

          <Text className="mt-10 text-justify">
            To emerge as a globally recognized center for Islamic philosophy and
            civilizational studies, contributing to the understanding of ethics,
            governance, knowledge systems, and human civilization.
          </Text>
        </div>
      </Container>
    </section>
  );
};

export default page;
