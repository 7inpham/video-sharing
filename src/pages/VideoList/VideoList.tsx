import { useEffect, useState } from 'react'
import { IVideo } from 'types/video'
import Layout from 'components/Layout/Layout'
import VideoCard from 'components/VideoCard/VideoCard'
import { getVideos } from 'services/video'

function VideoList() {
  const [ videos, setVideos ] = useState<IVideo[]>([])

  useEffect(() => {
    const load = async () => {
      const result = await getVideos()
      setVideos(result)
    }
    load()
  }, [])

  return (
    <Layout>
      {
        videos.map((video) => <VideoCard key={video.id} video={video}/>)
      }
    </Layout>
  )
}
export default VideoList
