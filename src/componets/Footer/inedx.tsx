import React from 'react'
import Config from '../../../config/myConfig'
import Style from './index.less'
const Footer: React.FC = props => {
  return (
    <div className={Style.Footer}>
      <span>{Config.footerText}</span>
    </div>
  );
}

export default Footer