import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

import LayoutHeader from './LayoutHeader/LayoutHeader'
import LayoutFooter from './LayoutFooter'
import { Outlet } from 'react-router-dom'

function Container() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout
      style={{
        height: '100vh',
        paddingTop: 0,
        maxWidth: '1280px',
        marginInline: 'auto',
      }}>
      <LayoutHeader />
      <Content style={{ padding: '0 10px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100vh',
            borderRadius: borderRadiusLG,
          }}>
          <Outlet />
        </div>
      </Content>
      <LayoutFooter text="RunCode Studio" />
    </Layout>
  )
}

export default Container
