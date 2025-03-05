import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Form, Input, Button, Typography } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import styles from './Registration.module.css'

const { Title } = Typography

interface RegistrationFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Registration: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>()

  const onSubmit = (data: RegistrationFormValues) => {
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <Title level={2}>Регистрация</Title>
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
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Некорректный email',
              },
            }}
            render={({ field }) => (
              <Input {...field} prefix={<MailOutlined />} placeholder="Email" />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Пароль"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Подтверждение пароля обязательно',
              validate: value =>
                value === watch('password') || 'Пароли не совпадают',
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Подтвердите пароль"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Registration
