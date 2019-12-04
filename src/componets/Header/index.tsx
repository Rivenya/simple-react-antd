import React from 'react'
import Config from '../../../config/myConfig'
import Style from './index.less'
const Header: React.FC = props => {
  return (
    <div className={Style.header}>
      <img src={Config.logo} alt="" />
      <span>{Config.title}</span>
    </div>
  );
}

export default Header