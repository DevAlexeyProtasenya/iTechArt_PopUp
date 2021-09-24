import { FieldType, FormSettingsType } from '../../common/common';
import Util from '../../common/Util';
import Modal from '../modal/Modal';
import './form.scss';

class Form extends Modal {
  private fields: FieldType[];

  private handler: (form: HTMLFormElement) => void;

  private required: HTMLInputElement[];

  private errorLabel: HTMLLabelElement;

  private form: HTMLFormElement;

  constructor(formSettings: FormSettingsType) {
    const { fields, handler } = formSettings;
    const form = Util.createNewElement('form', [
      'toast-form',
    ]) as HTMLFormElement;
    super(form);
    this.fields = fields;
    this.handler = handler;
    this.required = [];
    this.errorLabel = Util.createNewElement('label', [
      'error-text',
    ]) as HTMLLabelElement;
    this.form = form;
    this.setContent();
  }

  public setContent(): void {
    this.fields.forEach(field => this.createFormElement(field));
    this.createButtons();
  }

  public createFormElement(field: FieldType): void {
    switch (field.type) {
      case 'header': {
        this.createHeader(field);
        break;
      }
      case 'radio': {
        this.createRadioInput(field);
        break;
      }
      case 'text': {
        this.createInput(field);
        break;
      }
      case 'number': {
        this.createInput(field);
        break;
      }
      default:
        break;
    }
  }

  public createHeader(field: FieldType): void {
    const header = document.createElement('h2');
    header.textContent = field.text;
    this.form.appendChild(header);
  }

  public createButtons(): void {
    const buttons = Util.createNewElement('div', ['toast-form__buttons']);
    const submitButtonSettings = {
      type: 'button',
      action: 'click',
      handler: () => this.completeForm(),
      content: 'Complete',
      classes: ['complete-btn'],
    };
    const cancelButtonSettings = {
      type: 'button',
      action: 'click',
      handler: () => this.cancelForm(),
      content: 'Cancel',
      classes: ['cancel-btn'],
    };
    Util.addButton(submitButtonSettings, buttons);
    Util.addButton(cancelButtonSettings, buttons);
    this.form.appendChild(buttons);
  }

  public createInput(field: FieldType): HTMLDivElement {
    const { id, text, type, name, isRequire } = field;
    const textField = document.createElement('input');
    const label = document.createElement('label');
    label.textContent = text;
    textField.type = type;
    if (id && name) {
      label.htmlFor = id;
      textField.name = name;
      textField.id = id;
    }
    const rootDiv = document.createElement('div');
    rootDiv.appendChild(label);
    rootDiv.appendChild(textField);
    if (isRequire) {
      this.required.push(textField);
    }
    rootDiv.classList.add('text-field');
    if (type !== 'radio') {
      this.form.appendChild(rootDiv);
    }
    return rootDiv;
  }

  public createRadioInput(field: FieldType): void {
    const rootDiv = this.createInput(field);
    const radio = rootDiv.querySelector('input');
    const { value, checked } = field;
    if (radio && value) {
      radio.value = value;
      radio.checked = checked || false;
      this.form.appendChild(rootDiv);
    }
  }

  public completeForm(): void {
    if (this.validateFields()) {
      this.handler(this.form);
      this.cancelForm();
    }
  }

  public cancelForm(): void {
    this.closeModal();
  }

  public validateFields(): boolean {
    for (let i = 0; i < this.required.length; i += 1) {
      if (this.required[i].value.length === 0) {
        this.errorLabel.textContent = 'Required fields should be filled!';
        this.form.appendChild(this.errorLabel);
        return false;
      }
    }
    this.errorLabel.textContent = '';
    return true;
  }
}

export default Form;
