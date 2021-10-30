import { ChangeEvent, FormEvent, useState } from 'react'
import { getYoutubeId, listYoutubeInfo } from 'services'
import VideoCard from 'components/VideoCard/VideoCard'
import styles from './ShareVideoForm.module.scss'
import { IVideo } from 'types/video'
import { saveVideo } from 'services/video'
import { useAuth } from 'context/auth'

function ShareVideoForm() {
  const { user } = useAuth()
  const [url, setUrl] = useState('')
  const [video, setVideo] = useState<IVideo | null>(null)

  const handleChangeUrl = async (e: ChangeEvent<HTMLInputElement>) => {
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
          viewCount: Number(info.items[0].statistics.viewCount),
          likeCount: Number(info.items[0].statistics.likeCount),
          dislikeCount: Number(info.items[0].statistics.dislikeCount)
        }
        if (user) {
          v.sharedBy = user.email
        }
        setVideo(v)
      }
    } else {
      setVideo(null)
    }
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (video) {
        await saveVideo(video)
        setUrl('')
        setVideo(null)
        alert('Success')
      }
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1>Share a Youtube movie</h1>
        <label>Youtube URL</label>
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={url}
          onChange={handleChangeUrl}
        />
        <input type="submit" value="Share" disabled={!video}/>
      </form>
      { video && <VideoCard video={video} /> }
    </div>
  )
}

export default ShareVideoForm
