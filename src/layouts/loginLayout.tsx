import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import Styles from './loginLayout.less';
import Header from '@/componets/Header/index'
import Footer from '@/componets/Footer/inedx'

import router from 'umi/router';
const { TabPane } = Tabs;


const LoginLayout: React.FC = (props: any) => {
  useEffect(() => {
    const token = window.localStorage.getItem("wtoken")
    if (token) {
      router.push('/dashboard')
    }
  }, [])
  const handleChange = (activeKey) => {
    if (props.location.pathname != activeKey) {
      router.push(activeKey)
    }
  }
  return (
    <div className={Styles.login}>
      <header>
        <Header />
      </header>
      <main>
        <Tabs defaultActiveKey={props.location.pathname} onChange={handleChange} >
          <TabPane tab="账号密码登录" key="/user/login" >
            {props.children}
          </TabPane>
          <TabPane tab="手机号码登录" key="/user/loginphone" >
            {props.children}
          </TabPane>
        </Tabs>
      </main>
      <div className={Styles.footer}>
        <Footer ></Footer>
      </div>
    </div>
  );
}

export default LoginLayout
