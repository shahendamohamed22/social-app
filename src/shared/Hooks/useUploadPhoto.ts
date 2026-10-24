import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";

export default function useUploadPhoto() {
    const { mutate: uploadPhoto, isPending: photoIsPending } = useMutation({
        mutationFn: (formData: FormData) => {
            return api.put("users/upload-photo", formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
        }
    })

    return { uploadPhoto, photoIsPending }
}