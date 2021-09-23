var Modal = (function(){
  function ModalComponent (content){
    Popup.call(this, 'div', 'body');
    this.content = content;
    this.modal = this.createModal();
    this.createParentElement();
  }

  ModalComponent.prototype = Object.create(Popup.prototype);
  ModalComponent.prototype.constructor = ModalComponent;

  ModalComponent.prototype.createParentElement = function(){
    this.addClassesToElement(this.element, ['modal-wrapper']);
    this.addListener(this.element, 'click', this.closeModalByWrapper);
    this.addElement(this.modal);
  }

  ModalComponent.prototype.createModal = function(){
    const modal = document.createElement('div');
    modal.classList.add('modal');
    if(this.content){
      modal.appendChild(this.makeContentWrapper());
    }
    return modal;
  }

  ModalComponent.prototype.makeContentWrapper = function(){
    var wrapper = document.createElement('div');
    this.addClassesToElement(wrapper, ['content-wrapper']);
    wrapper.appendChild(this.content);
    return wrapper
  }

  ModalComponent.prototype.closeModalByWrapper = function(event){
    if(event.target.classList.contains('modal-wrapper')){
      this.closeModal();
    }
  }

  ModalComponent.prototype.closeModal = function(){
    this.addClassesToElement(this.modal, ['closing']);
    this.element.removeEventListener('click', this.closeModal);
    setTimeout(this.hide.bind(this), 300);
  }
  return ModalComponent;
})();