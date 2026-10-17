export interface ICratePostProps {
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    body : string 
    image : string
    postId : string 
}

export interface IUpdatePost {
    postId: string
    formdata: FormData
}