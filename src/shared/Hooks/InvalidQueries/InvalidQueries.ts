import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { profileContext } from "../../context/MyProfileContext/MyProfileContext";

export default function useInvalidateQueries() {

    const client = useQueryClient()
    const { myProfileData } = useContext(profileContext)

    function invalidatePosts(postId?: string) {
        client.invalidateQueries({ queryKey: ["feeds"] });
        client.invalidateQueries({ queryKey: ["posts"] });
        client.invalidateQueries({ queryKey: ["posts", postId] });
        client.invalidateQueries({ queryKey: ["posts", myProfileData?._id] });
    }


    function invalidateComments(postId: string) {
        client.invalidateQueries({ queryKey: ['comments', postId] });
    }


    function invalidateReplies(postId: string, commentId: string) {
        client.invalidateQueries({ queryKey: ["replies", postId, commentId] });
    }

    function invalidateNotifications() {
        client.invalidateQueries({ queryKey: ["Notifications"] })
        client.invalidateQueries({ queryKey: ["NotificationCount"] })
    }

    function invalidateSuggestions() {
        client.invalidateQueries({ queryKey: ["suggestions"] });
    }

    function invalidateProfiles(userId?: string) {
        client.invalidateQueries({ queryKey: ["userProfile", userId] });
        client.invalidateQueries({ queryKey: ["myProfile"], });
    }

    function invalidateSavedPosts() {
        client.invalidateQueries({ queryKey: ["savedPosts"] });
    }

    
    return {
        invalidatePosts, invalidateComments, invalidateReplies,
        invalidateNotifications, invalidateSuggestions, invalidateProfiles, invalidateSavedPosts
    }
}

