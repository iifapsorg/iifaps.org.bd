import React from "react";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";
import { FaCheck } from "react-icons/fa6";
import {
  researchAreas,
  coreFocusAreas,
  ourApproach,
  ourActivities,
} from "@/config/about-iifaps.config";

const page = () => {
  return (
    <section>
      <Container>
        {/* === what we do == */}
        <div className="">
          <Text variant="sectionHeading" className="mx-auto text-center">
            What We Do
          </Text>

          <Text className="mt-10 text-center">
            IIFAPS is committed to advancing research, dialogue, and academic
            engagement in Islamic and civilizational studies. Our core
            activities include:
          </Text>

          {/* === what-we-do list items === */}
          <ul className="mt-15 list-disc space-y-3 pl-6">
            {researchAreas?.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>

        {/* === core focus area == */}
        <div className="mt-15">
          <Text variant="sectionHeading" className="mx-auto text-center">
            OUR CORE FOCUS AREAS
          </Text>

          {/* === core focus area list items === */}
          <ul className="mt-15 space-y-3">
            {coreFocusAreas?.map(({ id, title }) => (
              <li key={id} className="flex items-center gap-3">
                <FaCheck className="text-primary shrink-0" />
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>

        {/* ===  our Approach == */}
        <div className="mt-15">
          <Text variant="sectionHeading" className="mx-auto text-center">
            OUR APPROACH
          </Text>

          <Text className="mt-10 text-center">
            We follow a research-based, critical, and interdisciplinary
            methodology that connects:
          </Text>

          {/* === our Approach list items === */}
          <ul className="mt-15 list-disc space-y-3 pl-6">
            {ourApproach?.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>

        {/* ===  our Activities == */}
        <div className="mt-15">
          <Text variant="sectionHeading" className="mx-auto text-center">
            OUR ACTIVITIES
          </Text>

          {/* === our activities list items === */}
          <ul className="mt-15 list-disc space-y-3 pl-6">
            {ourActivities?.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default page;
