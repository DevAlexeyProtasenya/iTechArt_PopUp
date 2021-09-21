function Toastr (text, title, type, timeout) {
  Popup.call(this, 'div', '#toasts');
  this.text = text;
  this.title = title;
  this.type = type;
  this.timeout = timeout || 5;
  this.closeIMG = './public/close.svg';
  this.createElement();
}
Toastr.prototype = Object.create(Popup.prototype);
Toastr.prototype.constructor = Toastr;

Toastr.prototype.addIcon = function(){
  var icon = document.createElement('img');
  icon.src = this.getIconSrc();
  icon.alt = this.title;
  icon.classList.add('toast__icon');
  this.addElement(icon);
}

Toastr.prototype.getIconSrc = function(){
  switch(this.type) {
    case ToastrType.SUCCESS: return ToastrImages.SUCCESS;
    case ToastrType.WARNING: return ToastrImages.WARNING;
    case ToastrType.ERROR: return ToastrImages.ERROR;
    case ToastrType.INFO: return ToastrImages.INFO;
  }
}

Toastr.prototype.createInformationBlock = function(){
  var infBlock = document.createElement('div');
  infBlock.classList.add('information');
  var header = document.createElement('h5');
  header.innerText = this.title;
  var text = document.createElement('p');
  text.innerText = this.text;
  infBlock.appendChild(header);
  infBlock.appendChild(text);
  this.addElement(infBlock);
}


Toastr.prototype.setCloseTimer = function(time){
  var timeout = setTimeout(function(){
    this.addClassesToElement(this.element, ['toast__disappearance']);
    setTimeout(this.hide.bind(this), 500);
  }.bind(this), time);
  return timeout
}

Toastr.prototype.createElement = function(){
  this.addClassesToElement(this.element, ['toast', this.type]);
  this.addIcon();
  this.createInformationBlock();
  var timeout = this.setCloseTimer(this.timeout*1000);
  this.addCloseButton(this.closeHandler.bind(this, timeout));
}

Toastr.prototype.closeHandler = function(timeout){
  clearTimeout(timeout);
  this.hide();
};
