import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  //? Search params that modifies the URL
  const query = (await searchParams).query;
  const params = { search: query || null };

  //? This is the old fetch where content was cached, but we switched to live from sanity live
  //const posts = await client.fetch(STARTUPS_QUERY);
  //? This is the new fetch where content is live // added <SanityLive /> at the end of page // added params
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      {/* Hero Section */}
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup <br /> Connect with Entreprenures
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and get noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      {/* Startups Section */}
      <section className="section_container">
        <p className=" text-30-semibold">
          {query ? `Search Results for ${query}` : "All Strartups"}
        </p>
        <ul className="card_grid mt-7">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Results Found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
