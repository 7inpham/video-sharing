import { useEffect, useState } from 'react'
import { IVideo } from 'types/video'
import { getVideos } from 'services/video'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import VideoCard from 'components/VideoCard/VideoCard'

function VideoList() {
  const [ loading, setLoading ] = useState(false)
  const [ videos, setVideos ] = useState<IVideo[]>([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const result = await getVideos()
        setVideos(result)
      } catch (e) {
        alert(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <Layout>
      <Loader loading={loading}/>
      {
        videos.map((video, index) => <VideoCard key={index} video={video}/>)
      }
      {
        (!loading && !videos.length)
        &&
        <div style={{textAlign: 'center'}}>No video</div>
      }
    </Layout>
  )
}
export default VideoList
