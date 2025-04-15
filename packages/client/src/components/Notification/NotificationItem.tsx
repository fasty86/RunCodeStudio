import style from './notification.module.css'

type NotificationItem = {
  title: string
  description: string
}
const NotificationItem: React.FC<NotificationItem> = props => {
  const { title, description } = props
  return (
    <div className={style['notification-item']}>
      <div className={style[title]}>{title}</div>
      <div className={style[description]}>{description}</div>
    </div>
  )
}

export default NotificationItem
