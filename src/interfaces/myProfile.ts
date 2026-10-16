import type { IUser } from "./userProfile"

export interface IMyProfile {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  cover: string
  bookmarks: string[]
  followers: string[]
  following: string[]
  createdAt: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}

export interface IProfileProps {
  profile : IMyProfile | IUser
  isFollow?: boolean
  isMyProfile?:boolean
}
