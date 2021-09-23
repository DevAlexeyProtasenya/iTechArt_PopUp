import Util from "../../common/Util.js";

class Popup {
  constructor(tag, parentSelector){
    this.element = Util.getElement(tag);
    this.parent = Util.getParent(parentSelector);
  }

  render(){
    this.parent.appendChild(this.element);
  }

  hide(){
    this.parent.removeChild(this.element);
  }

  addButton(buttonSettings, parent){
    const {type, action, handler, content, classes} = buttonSettings;
    const button = document.createElement('button');
    Util.addClassesToElement(button, classes);
    button.type = type;
    this.addListener(button, action, handler);
    button.textContent = content;
    parent.appendChild(button);
  }

  addListener(elem, action, handler){
    elem.addEventListener(action, handler);
  }

  addCloseButton(handler){
    const closeButtonSettings = {
      type: 'button',
      action: 'click',
      handler,
      content: 'X',
      classes: ['close-btn'],
    }
    this.addButton(closeButtonSettings, this.element);
  }

  addElement(element){
    this.element.appendChild(element);
  }
}

export default Popup;