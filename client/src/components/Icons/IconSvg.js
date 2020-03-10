import React, { Component } from 'react'

import {ReactComponent as IconDiff} from './SVG/diff.svg';
import {ReactComponent as IconHome} from './SVG/home.svg';
import {ReactComponent as IconBoard} from './SVG/moodboard.svg';
import {ReactComponent as IconProject} from './SVG/project.svg';
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
import {ReactComponent as IconSad} from './SVG/sad.svg';
import {ReactComponent as IconDelete} from './SVG/delete.svg';
import {ReactComponent as IconUp} from './SVG/up.svg';
import {ReactComponent as IconDown} from './SVG/down.svg';
import {ReactComponent as IconLeft} from './SVG/left.svg';
import {ReactComponent as IconRight} from './SVG/right.svg';
import {ReactComponent as IconError} from './SVG/error.svg';
import {ReactComponent as IconChecked} from './SVG/checked.svg';
import {ReactComponent as IconDoc} from './SVG/doc.svg';
import {ReactComponent as IconFreePik} from './SVG/freepik.svg';
import {ReactComponent as IconMinimize} from './SVG/minimize.svg';
import {ReactComponent as IconExpand} from './SVG/expand.svg';
import {ReactComponent as IconMenu} from './SVG/menu.svg';
import {ReactComponent as IconDot} from './SVG/dot.svg';
import {ReactComponent as IconNew} from './SVG/new.svg';
import {ReactComponent as IconDash} from './SVG/dash.svg';
import {ReactComponent as IconVLine} from './SVG/vline.svg';
import {ReactComponent as IconVLineS} from './SVG/vlines.svg';
import {ReactComponent as IconChange} from './SVG/change.svg';
import {ReactComponent as IconDocEdit} from './SVG/docedit.svg';
import {ReactComponent as IconUser} from './SVG/user.svg';
import {ReactComponent as IconOk} from './SVG/check.svg';
import {ReactComponent as IconQuestion} from './SVG/question.svg';
import {ReactComponent as IconSpeach} from './SVG/speach.svg';
import {ReactComponent as IconCopy} from './SVG/copy.svg';
import {ReactComponent as IconMove} from './SVG/move.svg';
import {ReactComponent as IconFollower} from './SVG/followers.svg';
import {ReactComponent as IconRefresh} from './SVG/refresh.svg';

export default class IconSvg extends Component {
  constructor() {
    super();
    this.iconList = [
      "home","project","moodboard","material","template","signup","edit","settings","login",
      "logout","info","plus","minus","cancel","save","delete","sad","diff",
      "up","down","left","right","error","checked","unchecked","freepik","minimize","expand",
      "menu","doc","dot","dash","vline","vlines","new","change","close","docedit","user","ok",
      "question","speach","copy","move","follower","refresh"
    ]
  }
  
  render() {
    let icoComponent = "";
    let icoClass = this.props.cls ? this.props.cls : "svg-txt";
    let icoName = this.props.ico ? this.props.ico : 'sad';
    icoName = this.iconList.includes( icoName ) ? icoName : 'sad';
    let cnt = this.props.cnt ? this.props.cnt : 1;

    let icoList = [];

    for( let i=0; i < cnt; i++ ) {
      switch( icoName )
      {
        case "ok":         icoComponent = <IconOk key={`SVG_Icon_${i}`} className='svg__icon'/>;        break;
        case "user":       icoComponent = <IconUser key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "menu":       icoComponent = <IconMenu key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "diff":       icoComponent = <IconDiff key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "doc":        icoComponent = <IconDoc key={`SVG_Icon_${i}`} className='svg__icon'/>;       break;
        case "docedit":    icoComponent = <IconDocEdit key={`SVG_Icon_${i}`} className='svg__icon'/>;   break;
        case "home":       icoComponent = <IconHome key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "project":    icoComponent = <IconProject key={`SVG_Icon_${i}`} className='svg__icon'/>;   break;
        case "moodboard":  icoComponent = <IconBoard key={`SVG_Icon_${i}`} className='svg__icon'/>;     break;
        case "material":   icoComponent = <IconMaterial key={`SVG_Icon_${i}`} className='svg__icon'/>;  break;
        case "template":   icoComponent = <IconTemplate key={`SVG_Icon_${i}`} className='svg__icon'/>;  break;
        case "signup":     icoComponent = <IconSignup key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "edit":       icoComponent = <IconEdit key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "settings":   icoComponent = <IconSettings key={`SVG_Icon_${i}`} className='svg__icon'/>;  break;
        case "login":      icoComponent = <IconLogin key={`SVG_Icon_${i}`} className='svg__icon'/>;     break;
        case "logout":     icoComponent = <IconLogout key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "info":       icoComponent = <IconInfo key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "plus":       icoComponent = <IconPlus key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "minus":      icoComponent = <IconMinus key={`SVG_Icon_${i}`} className='svg__icon'/>;     break;
        case "cancel":     icoComponent = <IconCancel key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "close":      icoComponent = <IconCancel key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "save":       icoComponent = <IconSave key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "delete":     icoComponent = <IconDelete key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "up":         icoComponent = <IconUp key={`SVG_Icon_${i}`} className='svg__icon'/>;        break;
        case "down":       icoComponent = <IconDown key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "left":       icoComponent = <IconLeft key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "right":      icoComponent = <IconRight key={`SVG_Icon_${i}`} className='svg__icon'/>;     break;
        case "error":      icoComponent = <IconError key={`SVG_Icon_${i}`} className='svg__icon'/>;     break;
        case "checked":    icoComponent = <IconChecked key={`SVG_Icon_${i}`} className='svg__icon'/>;   break;
        case "unchecked":  icoComponent = <IconMaterial key={`SVG_Icon_${i}`} className='svg__icon'/>;  break;
        case "freepik":    icoComponent = <IconFreePik key={`SVG_Icon_${i}`} className='svg__icon'/>;   break;
        case "minimize":   icoComponent = <IconMinimize key={`SVG_Icon_${i}`} className='svg__icon'/>;  break;
        case "expand":     icoComponent = <IconExpand key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "dot":        icoComponent = <IconDot key={`SVG_Icon_${i}`} className='svg__icon'/>;       break;
        case "dash":       icoComponent = <IconDash key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "vline":      icoComponent = <IconVLine key={`SVG_Icon_${i}`} className='svg__icon'/>;     break;
        case "vlines":     icoComponent = <IconVLineS key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "new":        icoComponent = <IconNew key={`SVG_Icon_${i}`} className='svg__icon'/>;       break;
        case "change":     icoComponent = <IconChange key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "question":   icoComponent = <IconQuestion key={`SVG_Icon_${i}`} className='svg__icon'/>;  break;
        case "speach":     icoComponent = <IconSpeach key={`SVG_Icon_${i}`} className='svg__icon'/>;    break;
        case "copy":       icoComponent = <IconCopy key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "move":       icoComponent = <IconMove key={`SVG_Icon_${i}`} className='svg__icon'/>;      break;
        case "follower":   icoComponent = <IconFollower key={`SVG_Icon_${i}`} className='svg__icon'/>;  break;
        case "refresh":    icoComponent = <IconRefresh key={`SVG_Icon_${i}`} className='svg__icon'/>;   break;
        default:           icoComponent = <IconSad key={`SVG_Icon_${i}`} className='svg__icon'/>;       break;
      }
      icoList.push( icoComponent );
    }

    return ( <span className={`svg-ico ${icoClass}`}>{ icoList }</span> );
  }
}
