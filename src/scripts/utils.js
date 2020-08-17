const picModal = document.querySelector('.pic-modal');

export const closePicModalByEsc = (evt) => {
  if (evt.key === 'Escape') {
    picModal.classList.remove('pic-modal_opened');
    document.removeEventListener('keydown', closePicModalByEsc);
  }
}

export const closePicModalByOverlay = (evt) => {
  if (evt.target.classList.contains('pic-modal_opened')) {
    picModal.classList.remove('pic-modal_opened');
  }
}

export const togglePicModal = () => {
  picModal.classList.toggle('pic-modal_opened');
  
  if (picModal.classList.contains('pic-modal_opened')) {
    picModal.addEventListener('mousedown', (evt) => {
      closePicModalByOverlay(evt);
    });
    document.addEventListener('keydown', closePicModalByEsc);
  }
}