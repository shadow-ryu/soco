"use client";

import { CommentVote, User } from "@prisma/client";
import { Session } from "next-auth";
import React, { FC, useState } from "react";
import { Button } from "../ui/Button";
import PostComment from "./PostComment";
type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
  replies: ReplyComment[];
};
type ReplyComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comments: ExtendedComment;
  session: Session;
  postId: string;
}

const MoreComments: FC<PostCommentProps> = ({ comments, session, postId }) => {
  const [showReplies, setShowReplies] = useState(false);
  console.log( comments)
  return (
    <div>
      {comments ? (
        <div className="">
          {comments?.replies?.length ? (
            <Button
              variant={"link"}
              className="text-sky-700 hover:border-none focus:outline-none"
              onClick={() => setShowReplies(!showReplies)}
            >
              {comments?.replies?.length}{" "}
              {comments?.replies?.length === 1 ? "reply" : "replies"}{" "}
            </Button>
          ) : null}

          <div className="">
            {showReplies &&
              comments.replies
                .sort((a, b) => b.votes.length - a.votes.length) // Sort replies by most liked
                .map((reply) => {
                  const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                    if (vote.type === "UP") return acc + 1;
                    if (vote.type === "DOWN") return acc - 1;
                    return acc;
                  }, 0);

                  const replyVote = reply.votes.find(
                    (vote) => vote.userId === session?.user.id
                  );
                  return (
                    <div
                      key={reply.id}
                      className="ml-2 py-2 pl-4 border-l-2 border-zinc-200"
                    >
                      <PostComment


                        comment={reply}
                        currentVote={replyVote}
                        votesAmt={replyVotesAmt}
                        postId={postId}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MoreComments;
