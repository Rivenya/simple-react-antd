import { Request, Response } from 'express'

export default {
  'POST /api/login': (req: Request, res: Response) => {
    const { username, password } = req.body
    if ((username === 'admin' && password === '123456') || (username === '11111111111' && password === '6666')) {
      res.send(
        {
          status: 200,
          msg: "success",
          data: {
            Authority: 'admin',
            userInfo: { name: "锐雯" }
          }
        }
      )
      return
    }
    res.send(
      {
        status: 401,
        msg: "验证码或者密码错误",
        data: null
      }
    )
    return
  },
  'POST /api/userInfo': (req: Request, res: Response) => {
    const { authority } = req.headers
    if (authority === 'admin') {
      res.send(
        {
          status: 200,
          msg: "success",
          data: {
            avatar: "",
            name: "锐雯",
            userId: 1,
            signature: true,
            group: 'administrator'
          }
        }
      )
    } else {
      res.status(401).send({
        status: 401,
        msg: "超时登录或未登录",
        data: null
      })
    }
    return
  },
  'POST /api/captcha': (req: Request, res: Response) => {
    const { phone } = req.body
    res.send(
      {
        status: 200,
        msg: "success",
        data: 6666
      }
    )
    return
  },
  'get /api/getMenu': (req: Request, res: Response) => {
    res.send(
      {
        status: 200,
        msg: "success",
        data:
          [
            {
              "name": "首页",
              "icon": "appstore",
              "router": "/dashboard"
            },
            {
              "name": "表单页",
              "icon": "form",
              "router": "/form"
            },
            {
              "name": "个人中心",
              "icon": "team",
              "router": "/account",
              "children": [
                {
                  "name": "个人设置",
                  "icon": "setting",
                  "router": "/account/setting"
                }
              ]
            }
          ]
      }
    )
    return
  }
}
