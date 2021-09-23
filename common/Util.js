class Util {
  static addClassesToElement(elem, classes){
    classes.forEach(curClass => elem.classList.add(curClass));
  }

  static createNewElement(tag, classes){
    const elem = document.createElement(tag);
    if(classes) {
      Util.addClassesToElement(elem, classes);
    }
    return elem;
  }

  static getParent(parentSelector){
    return document.querySelector(parentSelector);
  }

  static getElement(tag){
    return document.createElement(tag);
  }
}

export default Util;