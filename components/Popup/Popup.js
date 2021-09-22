class Popup {
  constructor(tag, parentSelector){
    this.element = this.getElement(tag);
    this.parent = this.getParent(parentSelector);
  }

  getParent(parentSelector){
    return document.querySelector(parentSelector);
  }

  getElement(tag){
    return document.createElement(tag);
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
    this.addClassesToElement(button, classes);
    button.type = type;
    this.addListener(button, action, handler);
    button.textContent = content;
    parent.appendChild(button);
  }

  addListener(elem, action, handler){
    elem.addEventListener(action, handler.bind(this));
  }

  addClassesToElement(elem, classes){
    for(let i = 0; i < classes.length; i++){
      elem.classList.add(classes[i]);
    }
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