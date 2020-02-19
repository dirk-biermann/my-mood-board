import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import MoodCard from "./MoodCard";

export default class MoodBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="main">
        <CardColumns>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
            <MoodCard {...this.props}/>
        </CardColumns>
      </div>
    )
  }
}
