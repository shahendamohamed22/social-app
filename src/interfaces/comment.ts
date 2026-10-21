export interface IComment {
    _id: string
    image: string
    content: string
    commentCreator: ICommentCreator
    post: string
    parentComment: string
    likes: string[]
    createdAt: string
    repliesCount: number
}

export interface IReply {
    _id: string
    content: string
    commentCreator: ICommentCreator
    post: string
    parentComment: string
    likes: string[]
    createdAt: string
    likesCount: number
    isReply: boolean
    id: string
}
export interface ICommentCreator {
    _id: string
    name: string
    username: string
    photo: string
    followersCount?: number
    followingCount?: number
    bookmarksCount?: number
    id?: string
}

export interface ICreatComment {
    postId: string
    formdata: FormData
}

export interface ICreatReply {
    postId: string
    formdata: FormData
    commentId: string
}

export interface IUpdateComment {
    postId: string
    commentId: string
    formdata?: FormData
}



