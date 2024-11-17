import React, { Suspense } from "react";
import Image from "next/image"; // For optimized image rendering.
import Link from "next/link"; // For client-side navigation.
import { notFound } from "next/navigation"; // For handling 404 cases.
import { formatDate } from "@/lib/utils"; // Utility function for formatting dates.

import { client } from "@/sanity/lib/client"; // Sanity client for data fetching.
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"; // Sanity queries for fetching startup data.

import markdownit from "markdown-it"; // Markdown parser for rendering pitch content.
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader component for fallback UI.
import View from "@/components/View"; // Component to display and update view counts.

// Initialize the markdown-it parser.
const md = markdownit();

// Enables experimental Parallel Routes and Layouts in Next.js.
export const experimental_ppr = true;

// TODO: Implement Editor-selected Startups feature.

/**
 * Page Component
 *
 * This React server component fetches and displays a startup's details using its unique ID.
 * It includes sections for title, description, pitch details (in Markdown), author information,
 * category, and a view count tracker.
 *
 */
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Extract the `id` from the incoming `params` object.
  const id = (await params).id;

  // Fetch the startup data using the provided `id`.
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  // If the post does not exist, return a 404 page.
  if (!post) return notFound();

  // Parse the `pitch` content from Markdown to HTML.
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      {/* Section for displaying the startup's creation date, title, and description */}
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>

      {/* Section for displaying the startup's main content */}
      <section className="section_container">
        {/* Display the startup's image */}
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        {/* Container for author information, category, and pitch details */}
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          {/* Author details and category */}
          <div className="flex-between gap-5">
            <Link href={`/user/${post?.author?._id}`}>
              <Image
                src={post?.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium">@{post?.author?.username}</p>
              </div>
            </Link>
            <p className="category-tag">{post?.category}</p>
          </div>

          {/* Pitch details section */}
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            // Render the pitch details as parsed HTML.
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        {/* Divider for separating sections */}
        <hr className="divider" />
        {/* TODO: Implement Editor-selected Startups */}
      </section>

      {/* Suspense wrapper for lazy loading the `View` component */}
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default Page;
