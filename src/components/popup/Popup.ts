import Util from 'common/Util';

class Popup {
  private element: HTMLElement;

  private parent: HTMLElement;

  public getElement(): HTMLElement {
    return this.element;
  }

  public setElement(element: HTMLElement): void {
    this.element = element;
  }

  public getParent(): HTMLElement {
    return this.parent;
  }

  public setParent(parent: HTMLElement): void {
    this.parent = parent;
  }

  constructor(tag: string, parentSelector: string) {
    this.element = Util.createElement(tag);
    this.parent = Util.getParent(parentSelector) || document.body;
  }

  public render(): void {
    this.parent.appendChild(this.element);
  }

  public hide(): void {
    this.parent.removeChild(this.element);
  }

  public addCloseButton(handler: (event: Event) => void): void {
    const closeButtonSettings = {
      type: 'button',
      action: 'click',
      handler,
      content: 'X',
      classes: ['close-btn'],
    };
    Util.addButton(closeButtonSettings, this.element);
  }

  public addElement(element: HTMLElement): void {
    this.element.appendChild(element);
  }
}

export default Popup;
