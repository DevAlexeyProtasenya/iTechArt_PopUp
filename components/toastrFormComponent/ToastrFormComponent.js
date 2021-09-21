function ToastForm() {
  this.label = this.createErrorLabel();
  this.form = this.creaeteForm();
  this.setContent();
  Modal.call(this, this.form);
}

ToastForm.prototype = Object.create(Modal.prototype);
ToastForm.prototype.varructor = ToastForm;

ToastForm.prototype.creaeteForm = function(){
  var form = document.createElement('form');
  this.addClassesToElement(form, ['toast-form']);
  return form;
};

ToastForm.prototype.setContent = function(){
  this.createHeader();
  this.createTextInputs();
  this.createRadioInputs();
  this.createButtons();
  this.createErrorLabel();
}

ToastForm.prototype.createHeader = function(){
  var header = document.createElement('h2');
  header.textContent = 'Custom Toast';
  this.form.appendChild(header);
}

ToastForm.prototype.createTextInputs = function(){
  var inputs = document.createElement('div');
  this.addClassesToElement(inputs, ['inputs']);
  this.createInput('title-textfield', 'title', 'Title:', 'text', inputs);
  this.createInput('text-textfield', 'text', 'Text:', 'text', inputs);
  this.createInput('timeout-textfield', 'timeout', 'Close time:', 'text', inputs);
  this.form.appendChild(inputs);
}

ToastForm.prototype.createRadioInputs = function(){
  var radios = document.createElement('div');
  this.addClassesToElement(radios, ['radio-btns']);
  this.createRadioInput('error-radio', 'typeToast', 'Error', ToastrType.ERROR, true, radios);
  this.createRadioInput('success-radio', 'typeToast', 'Success', ToastrType.SUCCESS, false, radios);
  this.createRadioInput('warning-radio', 'typeToast', 'Warning', ToastrType.WARNING, false, radios);
  this.createRadioInput('info-radio', 'typeToast', 'Info', ToastrType.INFO, false, radios);
  this.form.appendChild(radios);
}

ToastForm.prototype.createButtons = function(){
  var buttons = document.createElement('div');
  this.addClassesToElement(buttons, ['toast-form__buttons']);
  this.addButton('button', 'click', this.completeForm.bind(this), 'Complete', ['complete-btn'], buttons);
  this.addButton('button', 'click', this.cancelForm.bind(this), 'Cancel', ['cancel-btn'], buttons);
  this.form.appendChild(buttons);
}

ToastForm.prototype.createInput = function(id, name, text, type, parent){
  var textField = document.createElement('input');
  var label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = text;
  textField.type = type;
  textField.name = name;
  textField.id = id;
  var rootDiv = document.createElement('div');
  rootDiv.appendChild(label);
  rootDiv.appendChild(textField);
  rootDiv.classList.add('text-field');
  if(type === 'text'){
    parent.appendChild(rootDiv);
    return;
  }
  return rootDiv;
}

ToastForm.prototype.createRadioInput = function(id, name, text, value, checked, parent){
  var rootDiv = this.createInput(id, name, text, 'radio', parent);
  var radio = rootDiv.querySelector('input');
  radio.value = value;
  radio.checked = checked;
  parent.appendChild(rootDiv);
}

ToastForm.prototype.completeForm = function(){
  var title = document.getElementById('title-textfield').value;
  var text = document.getElementById('text-textfield').value;
  var timeout = document.getElementById('timeout-textfield').value;
  var types = document.getElementsByName('typeToast');
  var typeToast; 
  for(var i = 0; i < types.length; i++) {
    if(types[i].checked) {
      typeToast = types[i].value;
    }
  }
  if(this.validateFields(title, text, timeout)){
    var toast = new Toastr(text, title, typeToast, timeout);
    var toastField = document.querySelector('.toasts');
    toast.render(toastField);
    this.cancelForm();
  }
}

ToastForm.prototype.cancelForm = function(){
  this.hide();
}

ToastForm.prototype.validateFields = function(title, text, timeout){
  if(this.label.textContent.length !== 0){
    this.form.removeChild(this.label);
  }
  if(title.length === 0){
    console.log(this.label);
    this.label.textContent = 'Title must be filed!';
    this.form.appendChild(this.label);
    return false;
  }
  if(text.length === 0){
    this.label.textContent = 'Text must be filed!';
    this.form.appendChild(this.label);
    return false;
  }
  if(timeout.length === 0){
    this.label.textContent = 'Timeout must be filed!';
    this.form.appendChild(this.label);
    return false;
  }
  if(isNaN(timeout)){
    this.label.innerText = 'Timeout should contains only numbers!';
    this.form.appendChild(this.label);
    return false;
  }
  this.label.textContent = '';
  return true;
}

ToastForm.prototype.createErrorLabel = function(){
  var label = document.createElement('label');
  this.addClassesToElement(label, ['error-text']);
  return label;
}