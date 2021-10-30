export interface IYoutubeItem {
  id: string
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
  statistics: {
    likeCount: string
    dislikeCount: string
    viewCount: string
    commentCount: string
    favoriteCount: string
  }
}

export interface IYoutubeInfo {
  etag: string
  kind: string
  items: IYoutubeItem[]
}
