var Popup = (function (){
  function PopupComponent (tag, parentSelector) {
    this.element = this.createRootElement(tag);
    this.parent = this.getParent(parentSelector);
  }

  PopupComponent.prototype.getParent = function(parentSelector){
    return document.querySelector(parentSelector);
  }

  PopupComponent.prototype.render = function(){
    this.parent.appendChild(this.element);
  }

  PopupComponent.prototype.hide = function(){
    this.parent.removeChild(this.element);
  }

  PopupComponent.prototype.createRootElement = function(tag){
    return document.createElement(tag);
  }

  PopupComponent.prototype.addButton = function(type, action, handler, content, classes, parent){
    var button = document.createElement('button');
    this.addClassesToElement(button, classes);
    button.type = type;
    this.addListener(button, action, handler);
    button.textContent = content;
    parent.appendChild(button);
  }

  PopupComponent.prototype.addElement = function(element){
    this.element.appendChild(element);
  }

  PopupComponent.prototype.addListener = function(elem, action, handler){
    elem.addEventListener(action, handler.bind(this));
  }

  PopupComponent.prototype.addCloseButton = function(handler){
    this.addButton('button', 'click', handler, 'X', ['close-btn'], this.element)
  }

  PopupComponent.prototype.addClassesToElement = function(elem, classes){
    for(var i = 0; i < classes.length; i++){
      elem.classList.add(classes[i]);
    }
  }

  return PopupComponent;
})();