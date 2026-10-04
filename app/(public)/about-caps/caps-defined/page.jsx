import React from "react";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";

const page = () => {
  return (
    <section className="py-16.25">
      <Container>
        <div>
          <Text variant="sectionHeading" className="mx-auto text-center">
            CAPS Defined
          </Text>

          <Text className="mt-10 text-justify">
            The Center for Advanced Political Studies (CAPS) is an
            interdisciplinary academic and research institute dedicated to
            the systematic exploration of Islamic intellectual traditions.
          </Text>

          <Text className="mt-5 text-justify">
            It integrates philosophy, politics, theology, history, and cultural
            studies to develop a deeper understanding of civilization and
            knowledge systems from both classical and contemporary perspectives.
          </Text>
        </div>
      </Container>
    </section>
  );
};

export default page;
