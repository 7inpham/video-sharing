import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { IVideo } from 'types/video'
import { getYoutubeLink } from 'services'
import styles from './VideoCard.module.scss'

type Props = {
  video: IVideo
}

function VideoCard(props: Props) {
  const displayDescription = () => {
    const description = props.video.description
    return description.substring(0, Math.min(description.length, 140))
  }

  return (
    <div className={styles.container}>
      <div className={styles.thumbnail}>
        <a href={getYoutubeLink(props.video.id)} target="_blank" rel="noreferrer">
          <img src={props.video.thumbnailUrl} alt="Thumbnail" />
        </a>
        {/* <iframe
          width="420"
          height="315"
          title={props.video.id}
          src={`https://www.youtube.com/embed/${props.video.id}`}>
        </iframe> */}
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>
          <a href={getYoutubeLink(props.video.id)} target="_blank" rel="noreferrer">
            {props.video.title}
          </a>
        </div>
        <div className={styles.sharedBy}>
          <span>Shared by: {props.video.sharedBy}</span>
        </div>
        <div className={styles.statistics}>
          <div>
            <FontAwesomeIcon icon={faEye} />
            <span>{props.video.viewCount}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{props.video.likeCount}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faThumbsDown} />
            <span>{props.video.dislikeCount}</span>
          </div>
        </div>
        <div className={styles.description}>{displayDescription()}</div>
      </div>
    </div>
  )
}

export default VideoCard
