export interface IComment {
    _id: string
    image: string
    content: string
    commentCreator: ICommentCreator
    post: string
    parentComment: any
    likes: string[]
    createdAt: string
    repliesCount: number
}

export interface ICommentCreator {
    _id: string
    name: string
    username: string
    photo: string
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