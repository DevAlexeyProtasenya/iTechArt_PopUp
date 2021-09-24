import {
  ToastrImages,
  ToastrSettingsType,
  ToastrType,
} from '../../common/common';
import Util from '../../common/Util';
import Popup from '../popup/Popup';
import './toastr.scss';

class Toastr extends Popup {
  private text: string;

  private title: string;

  private type: ToastrType;

  private timeout: number;

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getType(): ToastrType {
    return this.type;
  }

  public setType(type: ToastrType): void {
    this.type = type;
  }

  public getTimeout(): number {
    return this.timeout;
  }

  public setTimeout(timeout: number): void {
    this.timeout = timeout;
  }

  constructor(toastrSettings: ToastrSettingsType) {
    super('div', '#toasts');
    const { text, title, type, timeout } = toastrSettings;
    this.text = text;
    this.title = title;
    this.type = type;
    this.timeout = timeout || 5;
    this.createElement();
  }

  public createElement(): void {
    Util.addClassesToElement(this.getElement(), ['toast', this.type]);
    this.addIcon();
    this.createInformationBlock();
    const timeout = this.setCloseTimer(this.timeout * 1000);
    this.addCloseButton(() => {
      this.closeHandler(timeout);
    });
  }

  public addIcon(): void {
    const icon = document.createElement('img');
    icon.src = this.setIconSrc();
    icon.alt = this.title;
    icon.classList.add('toast__icon');
    this.addElement(icon);
  }

  public setIconSrc(): string {
    switch (this.type) {
      case ToastrType.SUCCESS:
        return ToastrImages.SUCCESS;
      case ToastrType.WARNING:
        return ToastrImages.WARNING;
      case ToastrType.ERROR:
        return ToastrImages.ERROR;
      case ToastrType.INFO:
        return ToastrImages.INFO;
      default:
        return ToastrImages.ERROR;
    }
  }

  public createInformationBlock(): void {
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

  public setCloseTimer(time: number): NodeJS.Timeout {
    const timeout = setTimeout(() => {
      Util.addClassesToElement(this.getElement(), ['toast__disappearance']);
      setTimeout(() => {
        this.hide();
      }, 500);
    }, time);
    return timeout;
  }

  public closeHandler(timeout: NodeJS.Timeout): void {
    clearTimeout(timeout);
    this.hide();
  }
}

export default Toastr;
