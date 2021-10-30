import { firestore } from './firebase-app'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { IVideo } from 'types/video'
import { config } from 'config'

async function saveVideo(video: IVideo) {
  await addDoc(collection(firestore, config.firebase.collection.videos), video)
}

async function getVideos(): Promise<IVideo[]> {
  const result = await getDocs(collection(firestore, config.firebase.collection.videos))
  const data = result.docs.map((doc) => doc.data())
  return data.map((item) => ({
    id: item['id'],
    title: item['title'],
    description: item['description'],
    viewCount: item['viewCount'],
    likeCount: item['likeCount'],
    dislikeCount: item['dislikeCount'],
    thumbnailUrl: item['thumbnailUrl'],
    sharedBy: item['sharedBy']
  } as IVideo))
}

export {
  saveVideo,
  getVideos
}
