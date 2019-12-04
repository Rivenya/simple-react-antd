import request from '@/utlis/request'

export async function queryUser(): Promise<any> {
  return request('/userInfo', {
    method: "POST"
  })
}

export async function getCaptcha(params): Promise<any> {
  const { phone } = params
  return request('/captcha', {
    method: "POST",
    data: { phone: phone }
  })
}

export async function login(params): Promise<any> {
  return request('/login', {
    method: "POST",
    data: params
  })
}

export async function getMenu(params): Promise<any> {
  return request('/getMenu')
}
