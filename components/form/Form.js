var Form = (function(){
  function FormComponent(content) {
    this.fields = content.fields;
    this.handler = content.handler;
    this.required = [];
    this.label = this.createErrorLabel();
    this.form = this.createForm();
    this.setContent();
    Modal.call(this, this.form);
  }

  FormComponent.prototype = Object.create(Modal.prototype);
  FormComponent.prototype.constructor = FormComponent;

  FormComponent.prototype.createForm = function(){
    var form = document.createElement('form');
    this.addClassesToElement(form, ['toast-form']);
    return form;
  };

  FormComponent.prototype.setContent = function(){
    for(var i = 0; i < this.fields.length; i++){
      this.createElement(this.fields[i]);
    }
    this.createButtons();
  }

  FormComponent.prototype.createElement = function(field){
    switch(field.type){
      case 'header': {
        this.createHeader(field);
        break;
      }
      case 'radio': {
        this.createRadioInput(field);
        break;
      }
      case 'text' : {
        this.createInput(field);
        break;
      }
      case 'number': {
        this.createInput(field);
        break;
      }
    }
  }

  FormComponent.prototype.createHeader = function(field){
    var header = document.createElement('h2');
    header.textContent = field.text;
    this.form.appendChild(header);
  }

  FormComponent.prototype.createButtons = function(){
    var buttons = document.createElement('div');
    this.addClassesToElement(buttons, ['toast-form__buttons']);
    this.addButton('button', 'click', this.completeForm.bind(this), 'Complete', ['complete-btn'], buttons);
    this.addButton('button', 'click', this.cancelForm.bind(this), 'Cancel', ['cancel-btn'], buttons);
    this.form.appendChild(buttons);
  }

  FormComponent.prototype.createInput = function(field){
    var textField = document.createElement('input');
    var label = document.createElement('label');
    label.htmlFor = field.id;
    label.textContent = field.text;
    textField.type = field.type;
    textField.name = field.name;
    textField.id = field.id;
    var rootDiv = document.createElement('div');
    rootDiv.appendChild(label);
    rootDiv.appendChild(textField);
    if(field.isRequire) {
      this.required.push(textField);
    }
    rootDiv.classList.add('text-field');
    if(field.type !== 'radio'){
      this.form.appendChild(rootDiv);
      return;
    }
    return rootDiv;
  }

  FormComponent.prototype.createRadioInput = function(field){
    var rootDiv = this.createInput(field);
    var radio = rootDiv.querySelector('input');
    radio.value = field.value;
    radio.checked = field.checked;
    this.form.appendChild(rootDiv);
  }

  FormComponent.prototype.completeForm = function(){
    if(this.validateFields()){
      this.handler.call(this, this.form);
      this.cancelForm();
    }
  }

  FormComponent.prototype.cancelForm = function(){
    this.closeModal();
  }

  FormComponent.prototype.validateFields = function(){
    for(var i = 0; i < this.required.length; i++) {
      if(this.required[i].value.length === 0){
        this.label.textContent = 'Required fields should be filled!';
        this.form.appendChild(this.label);
        return false;
      }
    }
    this.label.textContent = '';
    return true;
  }

  FormComponent.prototype.createErrorLabel = function(){
    var label = document.createElement('label');
    this.addClassesToElement(label, ['error-text']);
    return label;
  }

  return FormComponent;
})();