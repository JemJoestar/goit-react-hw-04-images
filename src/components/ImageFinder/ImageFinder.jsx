import { Component } from 'react';
import { SearchBar } from './SearchBar';
import { axiosPixabeyFetch } from 'components/Api/PixabeyApi';
import { SeeMoreBtn } from './SeeMoreBtn';
import * as basicLightbox from 'basiclightbox';
import { Modal } from './Modal/Modal';
import { PhotoList } from './PhotoList';
import css from "./ImageFinder.module.css"

export class ImageFinder extends Component {
  state = {
    photos: null,
    currentRequest: '',
    page: 1,
    renderSeeMoreBtn: false,
    totalHits: null,
    modalControls: null
  };

  newRequest = ({ event, searchReq }) => {
    event.preventDefault();
    if(searchReq === ""){
      return
    }
    this.setState({ currentRequest: searchReq });
  };

  loadPhotos = async () => {
    const newData = await axiosPixabeyFetch(
      this.state.currentRequest,
      this.state.page
    );
    this.setState({ totalHits: newData.totalHits });
    const newPhotos = newData.hits;
    this.addNewPhotosToState(newPhotos);
  };

  addNewPhotosToState = newPhotos => {
    this.setState({
      photos: [...(this.state.photos ?? []), ...newPhotos],
      page: this.state.page + 1,
    });
  };

  handleClick = ({event, bigImgUrl}) =>{
    const modal = basicLightbox.create(Modal({bigImgUrl}))
    this.setState({modalControls: modal})
    modal.show()
    document.querySelector(".modal").addEventListener("click", this.closeModalByClick)
    window.addEventListener("keydown", this.closeModalByEsc)
  }

  closeModalByClick = (event) =>{
    if(event.target === event.currentTarget){
      this.closeModal()
    }
  } 

  closeModalByEsc = (event) => {
    if(event.key === "Escape"){
      this.closeModal()
    }
  }

  closeModal = () => {
      this.state.modalControls.close()
      this.setState({modalControls: null})
      document.querySelector(".modal").removeEventListener("click", this.closeModal)
      window.removeEventListener("keydown", this.closeModalByEsc)
  }
  

  componentDidUpdate = (_, prevState) => {
    if (prevState.currentRequest !== this.state.currentRequest) {
      console.log(12)
      this.setState({ photos: null, page: 1 });
      this.loadPhotos();
    }
    if (
      this.state.page > 1 &&
      this.state.totalHits / 12 > this.state.page &&
      this.state.renderSeeMoreBtn !== true
    ) {
      this.setState({ renderSeeMoreBtn: true });
    } else if (
      this.state.renderSeeMoreBtn === true &&
      this.state.totalHits / 12 < this.state.page
    ) {
      this.setState({ renderSeeMoreBtn: false });
    }
  };

  render() {
    const canRanderPhotos =
      Array.isArray(this.state.photos) && this.state.photos.length !== 0;
    return (
      <div className={css.container}>
        <SearchBar onSubmit={this.newRequest} />
        {canRanderPhotos && <PhotoList photos={this.state.photos} onClick={this.handleClick}/>}
        {this.state.renderSeeMoreBtn && (
          <SeeMoreBtn onSeeMore={this.loadPhotos} />
        )}
      </div>
    );
  }
}
