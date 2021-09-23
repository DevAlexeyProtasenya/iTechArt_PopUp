import Util from "../../common/Util.js";
import Modal from "../modal/Modal.js";

class Form extends Modal {
  constructor(content){
    const {fields, handler} = content;
    const form = Util.createNewElement('form', ['toast-form']);
    super(form);
    this.fields = fields;
    this.handler = handler;
    this.required = [];
    this.errorlabel = Util.createNewElement('label', ['error-text']);
    this.form = form;
    this.setContent();
  }

  setContent(){
    this.fields.forEach(field => this.createFormElement(field));
    this.createButtons();
  }

  createFormElement(field){
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

  createHeader(field){
    const header = document.createElement('h2');
    header.textContent = field.text;
    this.form.appendChild(header);
  }

  createButtons(){
    const buttons = Util.createNewElement('div', ['toast-form__buttons']);
    const submitButtonSettings = {
      type: 'button',
      action: 'click',
      handler: () => this.completeForm(),
      content: 'Complete',
      classes: ['complete-btn'],
    }
    const cancelButtonSettings = {
      type: 'button',
      action: 'click',
      handler: () => this.cancelForm(),
      content: 'Cancel',
      classes: ['cancel-btn'],
    }
    this.addButton(submitButtonSettings, buttons);
    this.addButton(cancelButtonSettings, buttons);
    this.form.appendChild(buttons);
  }

  createInput(field){
    const {id, text, type, name, isRequire} = field;
    const textField = document.createElement('input');
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = text;
    textField.type = type;
    textField.name = name;
    textField.id = id;
    const rootDiv = document.createElement('div');
    rootDiv.appendChild(label);
    rootDiv.appendChild(textField);
    if(isRequire) {
      this.required.push(textField);
    }
    rootDiv.classList.add('text-field');
    if(type !== 'radio'){
      this.form.appendChild(rootDiv);
      return;
    }
    return rootDiv;
  }

  createRadioInput = function(field){
    const rootDiv = this.createInput(field);
    const radio = rootDiv.querySelector('input');
    radio.value = field.value;
    radio.checked = field.checked;
    this.form.appendChild(rootDiv);
  }

  completeForm(){
    if(this.validateFields()){
      this.handler(this.form);
      this.cancelForm();
    }
  }

  cancelForm(){
    this.closeModal();
  }

  validateFields(){
    for(let i = 0; i < this.required.length; i++) {
      if(this.required[i].value.length === 0){
        this.errorlabel.textContent = 'Required fields should be filled!';
        this.form.appendChild(this.errorlabel);
        return false;
      }
    }
    this.errorlabel.textContent = '';
    return true;
  }
}

export default Form