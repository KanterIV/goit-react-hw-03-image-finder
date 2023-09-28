import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
// import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import React, { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery></ImageGallery>
        <Button></Button>
        <Loader></Loader>
        {/* <Modal></Modal> */}
      </>
    );
  }
}
