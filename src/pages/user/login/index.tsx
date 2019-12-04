import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import Style from '../index.less'
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

const LoginLayout: React.FC = (props: any) => {
  const { getFieldDecorator } = props.form;
  const { dispatch } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "user/login",
          payload: values
        })
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit} className={Style.loginForm}>
      <Form.Item >
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
            className={Style.loginInput}
          />,
        )}
      </Form.Item>
      <Form.Item >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
            className={Style.loginInput}
          />,
        )}
      </Form.Item>
      <Form.Item >
        <Checkbox style={{ float: "left" }}>自动登录</Checkbox>
        <a className={Style.formForgot} href="">
          忘记密码
      </a>
        <Button type="primary" htmlType="submit" className={Style.formButton}>
          登录
      </Button>
        <div className={Style.other}>
          <span>其他登录方式</span>
          <Icon type="alipay" className={Style.icon} theme="outlined" />
          <Icon type="wechat" className={Style.icon} theme="outlined" />
          <Icon type="weibo" className={Style.icon} theme="outlined" />
          <a href="" className={Style.formForgot}>
            立即注册
      </a>
        </div>
      </Form.Item>
    </Form>
  );
}
export default connect(({ user }: ConnectState) => ({
}))(Form.create()(LoginLayout))
