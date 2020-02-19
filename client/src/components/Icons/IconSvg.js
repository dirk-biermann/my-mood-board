import React, { Component } from 'react'

import {ReactComponent as IconDiff} from './SVG/diff.svg';
import {ReactComponent as IconHome} from './SVG/home.svg';
import {ReactComponent as IconBoard} from './SVG/moodboard.svg';
import {ReactComponent as IconMaterial} from './SVG/material.svg';
import {ReactComponent as IconTemplate} from './SVG/template.svg';
import {ReactComponent as IconSignup} from './SVG/signup.svg';
import {ReactComponent as IconEdit} from './SVG/edit.svg';
import {ReactComponent as IconSettings} from './SVG/settings.svg';
import {ReactComponent as IconLogin} from './SVG/login.svg';
import {ReactComponent as IconLogout} from './SVG/logout.svg';
import {ReactComponent as IconInfo} from './SVG/info.svg';
import {ReactComponent as IconPlus} from './SVG/plus.svg';
import {ReactComponent as IconMinus} from './SVG/minus.svg';
import {ReactComponent as IconCancel} from './SVG/cancel.svg';
import {ReactComponent as IconSave} from './SVG/save.svg';
import {ReactComponent as IconDelete} from './SVG/delete.svg';
import {ReactComponent as IconSad} from './SVG/sad.svg';


export default class IconSvg extends Component {
  constructor() {
    super();
    this.iconList = [
      "home","moodboard","material","template","signup","edit","settings","login",
      "logout","info","plus","minus","cancel","save","delete","sad","diff"
    ]
  }
  
  render() {
    let icoComponent = "";
    let icoClass = this.props.cls ? this.props.cls : "svg-txt";
    let icoName = this.props.ico ? this.props.ico : 'sad';
    icoName = this.iconList.includes( icoName ) ? icoName : 'sad';
    
    switch( icoName )
    {
      case "diff":       icoComponent = <IconDiff className='svg__icon'/>;      break;
      case "home":       icoComponent = <IconHome className='svg__icon'/>;      break;
      case "moodboard":  icoComponent = <IconBoard className='svg__icon'/>;     break;
      case "material":   icoComponent = <IconMaterial className='svg__icon'/>;  break;
      case "template":   icoComponent = <IconTemplate className='svg__icon'/>;  break;
      case "signup":     icoComponent = <IconSignup className='svg__icon'/>;    break;
      case "edit":       icoComponent = <IconEdit className='svg__icon'/>;      break;
      case "settings":   icoComponent = <IconSettings className='svg__icon'/>;  break;
      case "login":      icoComponent = <IconLogin className='svg__icon'/>;     break;
      case "logout":     icoComponent = <IconLogout className='svg__icon'/>;    break;
      case "info":       icoComponent = <IconInfo className='svg__icon'/>;      break;
      case "plus":       icoComponent = <IconPlus className='svg__icon'/>;      break;
      case "minus":      icoComponent = <IconMinus className='svg__icon'/>;     break;
      case "cancel":     icoComponent = <IconCancel className='svg__icon'/>;    break;
      case "save":       icoComponent = <IconSave className='svg__icon'/>;      break;
      case "delete":     icoComponent = <IconDelete className='svg__icon'/>;    break;
      default:           icoComponent = <IconSad className='svg__icon'/>;       break;
    }
    return ( <div className={`svg-ico ${icoClass}`}>{icoComponent}</div> );
  }
}
