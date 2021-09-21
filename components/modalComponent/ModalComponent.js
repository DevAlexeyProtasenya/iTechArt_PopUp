function Modal (content){
  Popup.call(this, 'div', 'body');
  this.content = content;
  this.modal = this.createModal();
  this.createElement();
}

Modal.prototype = Object.create(Popup.prototype);
Modal.prototype.constructor = Modal;

Modal.prototype.createElement = function(){
  this.addClassesToElement(this.element, ['modal-wrapper']);
  this.addListener(this.element, 'click', this.closeModalByWrapper);
  this.addElement(this.modal);
}

Modal.prototype.createModal = function(){
  const modal = document.createElement('div');
  modal.classList.add('modal');
  if(this.content){
    modal.appendChild(this.makeContentWrapper());
  }
  return modal;
}

Modal.prototype.makeContentWrapper = function(){
  var wrapper = document.createElement('div');
  this.addClassesToElement(wrapper, ['content-wrapper']);
  wrapper.appendChild(this.content);
  return wrapper
}

Modal.prototype.closeModalByWrapper = function(event){
  if(event.target.classList.contains('modal-wrapper')){
    this.closeModal();
  }
}

Modal.prototype.closeModal = function(){
  this.addClassesToElement(this.modal, ['closing']);
  this.element.removeEventListener('click', this.closeModal);
  setTimeout(this.hide.bind(this), 300);
}