var modalModule = (function(){
  function Modal (content){
    popupModule.call(this, 'div', 'body');
    this.content = content;
    this.modal = this.createModal();
    this.createParentElement();
  }

  Modal.prototype = Object.create(popupModule.prototype);
  Modal.prototype.constructor = Modal;

  Modal.prototype.createParentElement = function(){
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
  return Modal;
})();