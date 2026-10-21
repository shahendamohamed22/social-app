import type { IPost } from "./post"

export interface ICratePostProps {
    isEdit?: boolean
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>
    post : IPost
}

export interface IUpdatePost {
    postId: string
    formdata: FormData
}