export interface ISuggestion {
  _id: string
  name: string
  username: string
  photo: string
  mutualFollowersCount: number
  followersCount: number
}

export interface ISuggestionCardProps {
  suggestion: ISuggestion;
};
