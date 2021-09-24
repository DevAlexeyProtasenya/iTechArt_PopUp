import Util from '../../common/Util';
import Popup from '../popup/Popup';
import './modal.css';

class Modal extends Popup {
  private content?: HTMLElement;

  private modal: HTMLDivElement;

  constructor(content?: HTMLElement) {
    super('div', 'body');
    this.content = content;
    this.modal = this.createModal();
    this.createParentElement();
  }

  public createModal(): HTMLDivElement {
    const modal = document.createElement('div');
    Util.addClassesToElement(modal, ['modal']);
    if (this.content) {
      modal.appendChild(this.makeContentWrapper());
    }
    return modal;
  }

  public createParentElement(): void {
    Util.addClassesToElement(this.getElement(), ['modal-wrapper']);
    Util.addListener(this.getElement(), 'click', event => {
      this.closeModalByWrapper(event);
    });
    this.addElement(this.modal);
  }

  public makeContentWrapper(): HTMLDivElement {
    const wrapper = document.createElement('div');
    Util.addClassesToElement(wrapper, ['content-wrapper']);
    if (this.content) {
      wrapper.appendChild(this.content);
    }
    return wrapper;
  }

  public closeModalByWrapper(event: Event): void {
    const target = event.target ? (event.target as HTMLElement) : null;
    if (target) {
      if (target.classList.contains('modal-wrapper')) {
        this.closeModal();
      }
    }
  }

  public closeModal(): void {
    Util.addClassesToElement(this.modal, ['closing']);
    this.getElement().removeEventListener('click', this.closeModal);
    setTimeout(this.hide.bind(this), 300);
  }
}

export default Modal;
