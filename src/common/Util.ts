import { ButtonSettingsType } from 'common/common';

abstract class Util {
  static addClassesToElement(elem: HTMLElement, classes: string[]): void {
    classes.forEach(curClass => elem.classList.add(curClass));
  }

  static createNewElement(tag: string, classes: string[]): HTMLElement {
    const elem = document.createElement(tag);
    if (classes) {
      Util.addClassesToElement(elem, classes);
    }
    return elem;
  }

  static getParent(parentSelector: string): HTMLElement | null {
    return document.querySelector(parentSelector);
  }

  static createElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }

  static addButton(
    buttonSettings: ButtonSettingsType,
    parent: HTMLElement,
  ): void {
    const { type, action, handler, content, classes } = buttonSettings;
    const button = document.createElement('button');
    Util.addClassesToElement(button, classes);
    button.type = type;
    Util.addListener(button, action, handler);
    button.textContent = content;
    parent.appendChild(button);
  }

  static addListener(
    elem: HTMLElement,
    action: string,
    handler: (event: Event) => void,
  ): void {
    elem.addEventListener(action, handler);
  }
}

export default Util;
