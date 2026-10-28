
import { useContext } from "react";
import { profileContext } from "../../shared/context/MyProfileContext";
import { useParams } from "react-router-dom";
import Posts from "./Posts/Posts";
import { Skeleton } from "@heroui/react";
import About from "./About/About";
import ProfileHeader from "./Header/ProfileHeader";
import useUserProfile from "../../shared/Hooks/ProfileHooks/useUserProfile";

export default function Profile() {

  const { userId } = useParams()

  const { myProfileData } = useContext(profileContext);

  const isMyProfile = !userId || userId === myProfileData?._id

  const { userData } = useUserProfile(userId)

  const profile = isMyProfile ? myProfileData : userData?.user
  const id = profile?._id;

  if (!profile) {
    return <div className="container mx-auto flex items-center gap-4 rounded-2xl bg-card p-5">
      <Skeleton className="h-20 w-20 shrink-0 rounded-full" />
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
    <>
      <title>{`Loop | ${profile.name}`}</title>
      <div className="mx-auto w-full max-w-7xl ">
        <div className="grid grid-cols-1 items-start gap-6 profile-BP:grid-cols-12">

          <main className="min-w-0 space-y-6 profile-BP:col-span-8">

            <ProfileHeader profile={profile} isFollow={userData?.isFollowing} isMyProfile={isMyProfile} />
            <section className="profile-BP:hidden">
              <About profile={profile} />
            </section>
            <section className="space-y-4">
              <Posts id={id} isMyProfile={isMyProfile} />
            </section>
          </main>

          <section className="hidden profile-BP:block profile-BP:col-span-4">
            <About profile={profile} />
          </section>
        </div>
      </div>
    </>
  );
}
