import css from "./Modal.module.css"

export const Modal = ({ bigImgUrl }) => {
  return `<div class="modal ${css.overlay}" >
    <div class="${css.image}">
      <img src="${bigImgUrl}" alt="photo" />
    </div>
  </div>`;
};
