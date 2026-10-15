export interface IPost {
  _id: string
  body: string
  privacy: string
  user: IUser
  sharedPost: any
  likes: any[]
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

export interface IUser {
  _id: string
  name: string
  username: string
  photo: string
}

export interface ITopComment {
  _id: string
  content: string
  commentCreator: ICommentCreator
  post: string
  parentComment: any
  likes: any[]
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
}
