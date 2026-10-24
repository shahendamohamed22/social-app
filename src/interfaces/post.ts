import type { IComment } from "./comment"

export interface IPost {
  _id: string
  body: string
  privacy: string
  user: IUserPost
  sharedPost: ISharedPost
  likes: string[]
  createdAt: string
  image: string
  commentsCount: number
  topComment: ITopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface IUserPost {
  _id: string
  name: string
  username: string
  photo: string
}

export interface ISharedPost {
  _id: string
  body: string
  image: string
  privacy: string
  user: IUserSheredPost
}

export interface IUserSheredPost {
  _id: string
  name: string
  username: string
  photo: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}


export interface ITopComment {
  _id: string
  content: string
  commentCreator: ICommentCreator
  post: string
  parentComment: string
  likes: string[]
  createdAt: string
}

export interface ICommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}

export interface IPostCardProps {
  post : IPost
  isMyProfile?: boolean
  SetIsEdit?: React.Dispatch<React.SetStateAction<boolean>> 
}

//*************** 

export interface IPostsProps {
  id : string | undefined
  isMyProfile? : boolean | undefined
}

//***************

export interface IPostProps{
    post : IPost
    comments? : IComment[]
}