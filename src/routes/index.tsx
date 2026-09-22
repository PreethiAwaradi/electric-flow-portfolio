import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Preethi Awaradi | Computer Science & Cybersecurity" },
      { name: "description", content: "Portfolio of Preethi Awaradi, a Computer Science Engineering student exploring cybersecurity, technology, and innovation." },
      { property: "og:title", content: "Preethi Awaradi | Computer Science & Cybersecurity" },
      { property: "og:description", content: "Explore Preethi Awaradi's journey through computer science, cybersecurity, hackathons, and collaborative learning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
