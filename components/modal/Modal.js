import Popup from "../popup/Popup.js";

class Modal extends Popup {
  constructor(content){
    super('div', 'body')
    this.content = content;
    this.modal = this.createModal();
    this.createParentElement();
  }

  createModal(){
    const modal = document.createElement('div');
    this.addClassesToElement(modal, ['modal']);
    if(this.content){
      modal.appendChild(this.makeContentWrapper());
    }
    return modal;
  }

  createParentElement(){
    this.addClassesToElement(this.element, ['modal-wrapper']);
    this.addListener(this.element, 'click', this.closeModalByWrapper);
    this.addElement(this.modal);
  }

  makeContentWrapper(){
    const wrapper = document.createElement('div');
    this.addClassesToElement(wrapper, ['content-wrapper']);
    wrapper.appendChild(this.content);
    return wrapper;
  }

  closeModalByWrapper(event){
    if(event.target.classList.contains('modal-wrapper')){
      this.closeModal();
    }
  }

  closeModal(){
    this.addClassesToElement(this.modal, ['closing']);
    this.element.removeEventListener('click', this.closeModal);
    setTimeout(this.hide.bind(this), 300);
  }
}

export default Modal;