
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { profileContext } from "../../shared/context/MyProfileContext";
import api from "../../shared/api/axiosRequest";
import { useParams } from "react-router-dom";
import Posts from "./Posts/Posts";
import { Skeleton } from "@heroui/react";
import About from "./About/About";
import ProfileHeader from "./Header/ProfileHeader";

export default function Profile() {

  const { userId } = useParams()

  const { myProfileData } = useContext(profileContext);

  const isMyProfile = !userId

  function getUserProfile() {
    return api.get(`users/${userId}/profile`)
  }

  const { data: userData } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: getUserProfile,
    select: (data) => data.data.data
  });

  const profile = isMyProfile ? myProfileData : userData?.user
  const id = profile?._id;

  if (!profile) {
    return <div className="container mx-auto flex items-center gap-4 rounded-2xl bg-card p-5">
      {/* Profile Picture */}
      <Skeleton className="h-20 w-20 shrink-0 rounded-full" />

      {/* Profile Info */}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-40 rounded-lg" />
        <Skeleton className="h-3 w-28 rounded-lg" />

        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-36 rounded-lg" />
        </div>
      </div>
    </div>;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

        {/* Profile and Posts: 9 columns */}
        <main className="min-w-0 space-y-6 lg:col-span-8">

          {/* Profile Header */}
          <ProfileHeader profile={profile} isFollow={userData?.isFollowing} isMyProfile={isMyProfile} />

          {/* Posts */}
          <section className="space-y-4">
            <Posts id={id} isMyProfile={isMyProfile} />
          </section>
        </main>

        {/* About */}
        <About profile={profile} />
      </div>
    </div>
  );
}
