import type { Post, Subreddit, User, Vote, Comment, CommentVote } from '@prisma/client'

export type ExtendedPost = Post & {
  subreddit: Subreddit
  votes: Vote[]
  author: User
  comments: Comment[]
}
export type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}
