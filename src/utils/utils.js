const picModal = document.querySelector('.pic-modal');

const closePicModalByEsc = (evt) => {
  if (evt.key === 'Escape') {
    picModal.classList.remove('pic-modal_opened');
    document.removeEventListener('keydown', closePicModalByEsc);
  }
}

const closePicModalByOverlay = (evt) => {
  if (evt.target.classList.contains('pic-modal_opened')) {
    picModal.classList.remove('pic-modal_opened');
  }
}

export const togglePicModal = () => {
  console.log('fsdsd')
  // picModal.classList.toggle('pic-modal_opened');
  
  // if (picModal.classList.contains('pic-modal_opened')) {
  //   picModal.addEventListener('mousedown', (evt) => {
  //     closePicModalByOverlay(evt);
  //   });
  //   document.addEventListener('keydown', closePicModalByEsc);
  // }
}