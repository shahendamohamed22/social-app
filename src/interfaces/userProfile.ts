export interface IUserProfile {
  isFollowing: boolean
  user: IUser
}

export interface IUser {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  cover: string
  followers: IFollowing[]
  following: IFollowing
  createdAt: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}

export interface IFollowing {
  _id: string
  name: string
  photo: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}
