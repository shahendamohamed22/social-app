import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import useInvalidateQueries from "./InvalidQueries/InvalidQueries";

export default function useUploadPhoto() {
    const { invalidatePosts , invalidateProfiles} = useInvalidateQueries()

    const { mutate: uploadPhoto, isPending: photoIsPending } = useMutation({
        mutationFn: (formData: FormData) => {
            return api.put("users/upload-photo", formData)
        },
        onSuccess: () => {
            invalidatePosts()
            invalidateProfiles()
        }
    })

    return { uploadPhoto, photoIsPending }
}