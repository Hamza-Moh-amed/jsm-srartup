import SearchForm from "@/components/SearchForm";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <section className="pink-container">
      <h1 className="heading">
        Pitch Your Startup <br /> Connect with Entreprenures
      </h1>
      <p className="subheading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and get noticed in Virtual Competitions.
      </p>

      <SearchForm query={query} />
    </section>
  );
}
