import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Form, Input, Button, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './Auth.module.css'

const { Title } = Typography

interface LoginFormValues {
  username: string
  password: string
}

const Auth: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <Title level={2}>Авторизация</Title>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username?.message}>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Имя пользователя обязательно' }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined />}
                placeholder="Имя пользователя"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Пароль обязателен' }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Пароль"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Auth
