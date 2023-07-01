import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import React from "react";
import PostFeed from "../post/PostFeed";

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
    include: {
      author: true,
      votes: true,
      comments: true,
      subreddit: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return (
    <div>
      <PostFeed initialPosts={posts} subredditName={""} />
    </div>
  );
};

export default GeneralFeed;
