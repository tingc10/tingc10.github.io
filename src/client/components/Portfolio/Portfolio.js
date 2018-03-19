import React, { Component } from 'react';
import portfolioList from './list';
import FilmStrip from 'FilmStrip/FilmStrip';
import ExamineImage from 'ExamineImage/ExamineImage';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
    }
  }
  onSelectImage(index) {
    this.setState({
      selectedImage: index,
    })
  }
  currentImage() {
    return portfolioList[this.state.selectedImage]
  }
  render() {
    console.log('hi i rendered');
    return (
      <div>
        <ExamineImage image={this.currentImage()} />
        <FilmStrip imageList={portfolioList} selectedImage={this.state.selectedImage} onSelectImage={this.onSelectImage.bind(this)} />
      </div>
    );
  }
}

export default Portfolio;
