import { useEffect, useState } from 'react'

type NotificationStatus = {
  title: string
  description: string
  isEnabled: boolean
}

type NotificationPermission = 'granted' | 'denied' | 'default'

const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

const setLocalStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const NOTIFICATION_STATUSES: Record<
  NotificationPermission,
  NotificationStatus
> = {
  granted: {
    title: 'Уведомления включены',
    description: 'Вы будете получать важные уведомления от нашего сервиса',
    isEnabled: true,
  },
  denied: {
    title: 'Уведомления отключены',
    description:
      'Разрешите уведомления в настройках браузера, чтобы не пропустить важные обновления',
    isEnabled: false,
  },
  default: {
    title: 'Уведомления не настроены',
    description: 'Нажмите кнопку, чтобы разрешить отправку уведомлений',
    isEnabled: false,
  },
}

const useNotification = () => {
  const typeNotification: NotificationPermission =
    getLocalStorage('notificationPermission') || 'default'
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationStatus>(NOTIFICATION_STATUSES[typeNotification])
  const [permission, setPermission] =
    useState<NotificationPermission>(typeNotification)
  const [notification, setNotification] = useState([])

  const requestPermission = () => {
    Notification.requestPermission().then(
      (newPermission: NotificationPermission) => {
        setPermission(newPermission)
        setNotificationStatus(NOTIFICATION_STATUSES[newPermission])
        setLocalStorage('notificationPermission', newPermission)
      }
    )
  }

  const toggleNotifications = () => {
    if (permission === 'denied') {
      alert('Пожалуйста, разрешите уведомления в настройках вашего браузера')
    } else if (permission === 'granted') {
      alert(
        'Пожалуйста, сбросьте разрешение на уведомления в настройках вашего браузера'
      )
    } else {
      requestPermission()
    }
  }

  const resetNotification = () => {
    const notificationPermission = getLocalStorage('notificationPermission')
    if (
      Notification.permission === 'default' &&
      notificationPermission !== Notification.permission &&
      notificationPermission
    ) {
      localStorage.removeItem('notificationPermission')
      setNotificationStatus(NOTIFICATION_STATUSES['default'])
      setPermission('default')
    }
  }

  useEffect(() => {
    resetNotification()
  }, [])

  return {
    notification,
    notificationStatus,
    toggleNotifications,
    isNotificationsEnabled: notificationStatus.isEnabled,
  }
}

export default useNotification
