import React, { useEffect, useState } from 'react'
import { Menu, Icon } from 'antd';
import router from 'umi/router';
const { SubMenu } = Menu;


const MyMenu: any = (props: any) => {
  const { data } = props

  const renderMenu = (data) => {
    if (data.children) {
      return (
        <SubMenu
          key={data.router}
          title={
            <span>
              <Icon type={data.icon} />
              <span>{data.name}</span>
            </span>
          }
        >
          {data.children.map(item => {
            return renderMenu(item)
          })}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={data.router}>
          <Icon type={data.icon} />
          <span>{data.name}</span>
        </Menu.Item>
      )
    }
  }

  const handleClick = ({ key }) => {
    router.push(key)
  }
  return (
    <>
      <Menu theme="dark" mode="inline" onClick={handleClick}>
        {data.length > 0 ? data.map(item => {
          return renderMenu(item)
        }) : ""}
      </Menu>
    </>
  )
}

export default MyMenu