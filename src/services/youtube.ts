import axios from 'axios'
import { IYoutubeInfo } from 'types/youtube'

async function listYoutubeInfo(ids: string[]): Promise<IYoutubeInfo> {
  const key = process.env.REACT_APP_YOUTUBE_DATA_API_KEY
  const parts = ['snippet', 'contentDetails', 'statistics']
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=${parts.join(',')}&id=${ids.join(',')}&key=${key}`
  const result = await axios.get<IYoutubeInfo>(url)
  return result.data
}

function getYoutubeId(url: string): string {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : ''
}

function getYoutubeLink(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

export {
  getYoutubeId,
  getYoutubeLink,
  listYoutubeInfo
}
