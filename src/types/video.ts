export interface IVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  viewCount: number
  likeCount: number
  dislikeCount: number
  sharedBy?: string
}
