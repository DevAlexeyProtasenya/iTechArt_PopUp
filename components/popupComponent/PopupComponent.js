var popupModule = (function (){
  function Popup (tag, parentSelector) {
    this.element = this.createRootElement(tag);
    this.parent = this.getParent(parentSelector);
  }

  Popup.prototype.getParent = function(parentSelector){
    return document.querySelector(parentSelector);
  }

  Popup.prototype.render = function(){
    this.parent.appendChild(this.element);
  }

  Popup.prototype.hide = function(){
    this.parent.removeChild(this.element);
  }

  Popup.prototype.createRootElement = function(tag){
    return document.createElement(tag);
  }

  Popup.prototype.addButton = function(type, action, handler, content, classes, parent){
    var button = document.createElement('button');
    this.addClassesToElement(button, classes);
    button.type = type;
    this.addListener(button, action, handler);
    button.textContent = content;
    parent.appendChild(button);
  }

  Popup.prototype.addElement = function(element){
    this.element.appendChild(element);
  }

  Popup.prototype.addListener = function(elem, action, handler){
    elem.addEventListener(action, handler.bind(this));
  }

  Popup.prototype.addCloseButton = function(handler){
    this.addButton('button', 'click', handler, 'X', ['close-btn'], this.element)
  }

  Popup.prototype.addClassesToElement = function(elem, classes){
    for(var i = 0; i < classes.length; i++){
      elem.classList.add(classes[i]);
    }
  }

  return Popup;
})();