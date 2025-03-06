import React from 'react'
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
  const [form] = Form.useForm<RegistrationFormValues>()

  const onFinish = (values: RegistrationFormValues) => {
    console.log('Форма отправлена:', values)
    // Здесь можно добавить логику отправки данных на сервер
  }

  return (
    <div className={styles.container}>
      <Title level={2}>Регистрация</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}>
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[
            { required: true, message: 'Имя пользователя обязательно' },
            {
              pattern: /^[a-zA-Z0-9_]{4,16}$/,
              message:
                'Логин должен содержать от 4 до 16 символов (латинские буквы, цифры и _)',
            },
          ]}>
          <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email обязателен' },
            {
              type: 'email',
              message: 'Некорректный email',
            },
          ]}>
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Пароль обязателен' },
            {
              min: 6,
              message: 'Пароль должен быть не менее 6 символов',
            },
          ]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Подтвердите пароль"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Подтверждение пароля обязательно' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают'))
              },
            }),
          ]}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Подтвердите пароль"
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
