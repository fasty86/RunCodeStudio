import { Switch } from 'antd'
import useNotification from '../../hooks/useNotification'
import NotificationItem from './NotificationItem'
import style from './notification.module.css'

const NotificationDrawer = () => {
  const {
    isNotificationsEnabled,
    toggleNotifications,
    notificationStatus,
    notification,
  } = useNotification()

  return (
    <div className={style['notification-area']}>
      <div className={style['notification-wrapper']}>
        {notification.length === 0 && 'Нет уведомлений'}
        {notification.map(el => {
          return <NotificationItem title={'hello'} description="То что нужно" />
        })}
      </div>
      <div className={style['notification-switch-area']}>
        <Switch
          checked={isNotificationsEnabled}
          defaultValue={isNotificationsEnabled}
          onChange={toggleNotifications}
        />
        <div className={style['notification-switch-info']}>
          <h5 className={style.title}>{notificationStatus.title}</h5>
          <h6 className={style.description}>
            {notificationStatus.description}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default NotificationDrawer
