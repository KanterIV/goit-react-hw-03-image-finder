import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, largeImageURL } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img className={css.ImageGalleryItemImage} src={webformatURL} alt="" />
      </li>
    );
  }
}
