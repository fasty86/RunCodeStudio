import { BellOutlined } from '@ant-design/icons'
import { Button, Drawer, Switch } from 'antd'
import useNotification from '../../hooks/useNotification'
import style from './notification.module.css'
import { useState } from 'react'

type notificationItem = {
  title: string
  description: string
}
const NotificationItem: React.FC<notificationItem> = props => {
  const { title, description } = props
  return (
    <div className={style['notification-item']}>
      <div className={style[title]}>{title}</div>
      <div className={style[description]}>{description}</div>
    </div>
  )
}

const NotificationContent = () => {
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

const NotificationBell = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        shape="circle"
        icon={<BellOutlined />}
        color="default"
        variant="filled"
        onClick={showDrawer}
        className={style['notification-bell']}
      />
      <Drawer title="Уведомления" onClose={onClose} open={open}>
        <NotificationContent />
      </Drawer>
    </>
  )
}

export default NotificationBell
