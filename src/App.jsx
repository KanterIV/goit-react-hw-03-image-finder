import React, { Component } from 'react';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import { searchService } from 'components/services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    pictureСards: [],
    isLoading: false,
    error: null,
    searchValue: null,
    currentPage: 1,
    loadMore: false,
    modal: {
      isOpen: false,
      data: null,
    },
  };

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

      if (pictureСards.length === 0) {
        this.setState({
          loadMore: false,
          error: toast.warning(
            `Sorry, there are no images matching your search query. Please try again.`,
            {
              theme: 'dark',
            }
          ),
        });
        return;
      }
      this.setState(prevState => ({
        pictureСards: [...prevState.pictureСards, ...pictureСards],
        loadMore: this.state.currentPage < Math.ceil(data.totalHits / 12),
      }));
      if (this.state.currentPage === Math.ceil(data.totalHits / 12)) {
        this.setState({
          error: toast.info(
            "We're sorry, but you've reached the end of search results.",
            {
              theme: 'dark',
            }
          ),
        });
      }
    } catch (error) {
      this.setState({
        error: toast.error('Sorry, something went wrong. Try again!', {
          theme: 'colored',
        }),
      });
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

  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery
          imagesArr={this.state.pictureСards}
          onOpenModal={this.onOpenModal}
        />
        {this.state.loadMore && <Button onClick={this.loadMoreImages} />}
        {this.state.error && <ToastContainer />}
        {this.state.isLoading && <Loader />}
        {this.state.modal.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            data={this.state.modal.data}
          />
        )}
      </>
    );
  }
}
