import { ChangeEvent, FormEvent, useState } from 'react'
import { useAuth } from 'context/auth'
import { IVideo } from 'types/video'
import { getYoutubeId, listYoutubeInfo, saveVideo } from 'services'
import VideoCard from 'components/VideoCard/VideoCard'
import Loader from 'components/Loader/Loader'
import styles from './ShareVideoForm.module.scss'

function ShareVideoForm() {
  const { user } = useAuth()
  const [url, setUrl] = useState('')
  const [video, setVideo] = useState<IVideo | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChangeUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const value = e.target.value
    setUrl(value)
    const id = getYoutubeId(value)
    if (id) {
      const info = await listYoutubeInfo([id])
      if (info.items[0]) {
        let v: IVideo = {
          id: info.items[0].id,
          title: info.items[0].snippet.title,
          description: info.items[0].snippet.description,
          thumbnailUrl: info.items[0].snippet.thumbnails.medium.url,
          viewCount: info.items[0].statistics.viewCount || '',
          likeCount: info.items[0].statistics.likeCount || '',
          dislikeCount: info.items[0].statistics.dislikeCount || '',
          sharedBy: user?.email ?? '',
          sharedAt: Date.now()
        }
        setVideo(v)
      }
    } else {
      setVideo(null)
    }
    setLoading(false)
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()
    try {
      if (video) {
        await saveVideo(video)
        setUrl('')
        setVideo(null)
        alert('Successfully shared')
      }
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Loader loading={loading}/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Share a Youtube movie</h1>
        <label>Youtube URL</label>
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={url}
          onChange={handleChangeUrl}
        />
        <input type="submit" value="Share" disabled={!video || loading}/>
      </form>
      {
        video
        &&
        <div className={styles.preview}>
          <VideoCard video={video} />
        </div>
      }
    </div>
  )
}

export default ShareVideoForm
