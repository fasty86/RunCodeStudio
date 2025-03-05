import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './Auth.module.css'

const { Title } = Typography

interface LoginFormValues {
  username: string
  password: string
}

const Auth: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const [clientReady, setClientReady] = useState<boolean>(false)

  useEffect(() => {
    setClientReady(true)
  }, [])

  const onFinish = (values: LoginFormValues) => {
    console.log('Finish:', values)
  }

  const isFormValid = (): boolean => {
    return (
      form.isFieldsTouched(true) &&
      !form.getFieldsError().filter(({ errors }) => errors.length).length
    )
  }

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Авторизация
      </Title>
      <Form
        form={form}
        name="horizontal_login"
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Имя пользователя обязательно',
            },
            {
              pattern: /^[a-zA-Z0-9_]{4,16}$/,
              message:
                'Логин должен содержать от 4 до 16 символов (латинские буквы, цифры и _)',
            },
          ]}
          className={styles.formItem}>
          <Input
            prefix={<UserOutlined />}
            placeholder="Имя пользователя"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пароль обязателен',
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                'Пароль должен содержать минимум 8 символов, включая буквы и цифры',
            },
          ]}
          className={styles.formItem}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Пароль"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item shouldUpdate className={styles.formItem}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isFormValid()}
              className={styles.button}>
              Авторизоваться
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Auth
