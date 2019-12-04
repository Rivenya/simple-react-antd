import React, { useEffect, useState } from 'react'
import Styles from './basicLayout.less';
import { connect } from 'dva';
import { UserState } from '@/models/user';
import { ConnectState } from '@/models/connect';
import router from 'umi/router';
import { Layout, Icon } from 'antd';
import Config from '../../config/myConfig'
import Menu from '@/componets/menu/index'

const { Header, Sider, Content } = Layout;

const Basiclayout: React.FC = (props: any) => {
  const { dispatch, children, userInfo, menuInfo } = props

  const [collapsed, setCollapsed] = useState(false)
  const [collapsedWidth, setCollapsedWidth] = useState(80)


  useEffect(() => {
    const token = window.localStorage.getItem("wtoken")
    if (dispatch && token) {
      dispatch({
        type: 'user/fetch',
        props: props
      }).then(
        res => {
          dispatch({
            type: 'user/getMenu'
          })
        }
      )
    } else {
      router.push('/user/login')
    }
  }, [])

  const toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout className={Styles.layout}>
      <Sider
        width="220"
        trigger={null}
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        breakpoint="sm"
        onBreakpoint={broken => {
          if (broken) {
            setCollapsedWidth(0)
          } else {
            setCollapsedWidth(80)
          }
        }}
      >
        <div className={Styles.logo} >
          <span style={{ marginRight: "12px" }}><img src={Config.logo2} alt="" /></span>
          <span>{Config.title}</span>
        </div>
        <Menu data={menuInfo}></Menu>
      </Sider>
      <Layout>
        <Header className={Styles.header}>
          <Icon
            className={Styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content
          className={Styles.conent}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default connect(({ user }: ConnectState) => ({
  userInfo: user.userInfo,
  menuInfo: user.menu
}))(Basiclayout)
