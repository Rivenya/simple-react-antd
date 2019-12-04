import React, { useState } from 'react'
import { Form, Icon, Input, Button, Row, Col, Checkbox, message } from 'antd';
import Style from '../index.less'
import { getCaptcha } from '@/service/api'
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';


const LoginLayout: React.FC = (props: any) => {
  const { getFieldDecorator } = props.form;
  const { dispatch, msg } = props
  const [seconds, setSconds] = useState({ time: 60, status: false })

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "user/login",
          payload: values
        })
        if (msg) {
          message.error(msg)
        }
      }
    });
  }

  const handleSend = (e) => {
    e.preventDefault();
    props.form.validateFields(["username"], (err, values) => {
      if (!err) {
        getCaptcha(values).then(({ status, msg, data }: { status: number, msg: string, data: any }) => {
          if (status === 200) {
            message.success(`短信验证码:${data}`)
          }
        })
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit} className={Style.loginForm}>
      <Form.Item >
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号码' }
          ],
        })(
          <Input
            prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="手机号"
            className={Style.loginInput}
          />,
        )}
      </Form.Item>
      <Form.Item >
        <Row>
          <Col span={18}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入短信验证码' },
                { pattern: /^[0-9]{4}$/, message: '请输入正确的短信验证码' }
              ],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="验证码"
                className={Style.loginInput}
              />
            )}</Col>
          <Col span={6}>
            <Button size="large"
              className={Style.getPhone}
              onClick={handleSend}
              disabled={seconds.status}>
              获取验证码
            </Button>
          </Col>
        </Row>
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
  msg: user.msg
}))(Form.create()(LoginLayout))
