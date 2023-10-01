import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
// import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import { searchService } from 'components/services/api';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    pictureСards: null,
    isLoading: false,
    error: null,
    searchValue: null,
    currentPage: 1,
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery imagesArr={this.state.pictureСards}></ImageGallery>
        <Button></Button>
        <Loader></Loader>
        {/* <Modal></Modal> */}
      </>
    );
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    console.log(event.currentTarget.elements.searchFormInput.value);

    const searchValue = event.currentTarget.elements.searchFormInput.value;
    this.setState({
      searchValue: searchValue,
    });

    event.currentTarget.reset();
  };

  fetchPicturesOnRequest = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await searchService(
        this.state.searchValue,
        this.state.currentPage
      );
      const pictureСards = data.hits;

      this.setState({ pictureСards: pictureСards });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchValue !== prevState.searchValue
    ) {
      this.fetchPicturesOnRequest();
    }
  }
}
