import Popup from '../popup/Popup.js';
import {ToastrType, ToastrImages} from '../../common/common.js';
import Util from '../../common/Util.js';

class Toastr extends Popup {
  constructor(toastrSettings){
    super('div', '#toasts');
    const {text, title, type, timeout} = toastrSettings;
    this.text = text;
    this.title = title;
    this.type = type;
    this.timeout = timeout || 5;
    this.closeIMG = './public/close.svg';
    this.createElement();
  }

  createElement(){
    Util.addClassesToElement(this.element, ['toast', this.type]);
    this.addIcon();
    this.createInformationBlock();
    const timeout = this.setCloseTimer(this.timeout*1000);
    this.addCloseButton(() => {this.closeHandler(timeout)});
  }

  addIcon(){
    var icon = document.createElement('img');
    icon.src = this.getIconSrc();
    icon.alt = this.title;
    icon.classList.add('toast__icon');
    this.addElement(icon);
  }

  getIconSrc(){
    switch(this.type) {
      case ToastrType.SUCCESS: return ToastrImages.SUCCESS;
      case ToastrType.WARNING: return ToastrImages.WARNING;
      case ToastrType.ERROR: return ToastrImages.ERROR;
      case ToastrType.INFO: return ToastrImages.INFO;
    }
  }

  createInformationBlock(){
    const infBlock = document.createElement('div');
    infBlock.classList.add('information');
    const header = document.createElement('h5');
    header.innerText = this.title;
    const text = document.createElement('p');
    text.innerText = this.text;
    infBlock.appendChild(header);
    infBlock.appendChild(text);
    this.addElement(infBlock);
  }

  setCloseTimer(time){
    const timeout = setTimeout(() => {
      Util.addClassesToElement(this.element, ['toast__disappearance']);
      setTimeout(() => {this.hide()}, 500);
    }, time);
    return timeout;
  }

  closeHandler(timeout){
    clearTimeout(timeout);
    this.hide();
  };
}

export default Toastr;