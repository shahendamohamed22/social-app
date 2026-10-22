export interface INotification {
  _id: string
  recipient: IRecipient
  actor: IActor
  type: string
  entityType: string
  entityId: string
  isRead: boolean
  createdAt: string
  entity: IEntity
}

export interface IRecipient {
  _id: string
  name: string
  photo: string
}

export interface IActor {
  _id: string
  name: string
  photo: string
}

export interface IEntity {
  _id: string
  body: string
  user: string
  commentsCount: number
  topComment: ITopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
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
