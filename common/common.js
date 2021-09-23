import Toastr from "../components/toastr/Toastr.js";

export const ToastrType = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
}

export const ToastrImages = {
  ERROR: './public/toastIcons/error.svg',
  WARNING: './public/toastIcons/warning.svg',
  SUCCESS: './public/toastIcons/success.svg',
  INFO: './public/toastIcons/info.svg',
}

export const toastFormFields = {
  handler: (form) => {
    const title = form.querySelector('#title-textfield').value;
    const text = form.querySelector('#text-textfield').value;
    const timeout = form.querySelector('#timeout-textfield').value; 
    const types = document.getElementsByName('typeToast');
    let typeToast;
    types.forEach(type => {
      if(type.checked)
        typeToast = type.value;
    });
    const toast = new Toastr({text, title, type: typeToast, timeout});
    const toastField = document.querySelector('.toasts');
    toast.render(toastField);
  },
  fields: [
    {
      type: 'header',
      text: 'Toast form'
    },
    {
      type: 'text',
      id: 'title-textfield',
      name: 'title',
      text: 'Title:',
      isRequire: true,
    },
    {
      type: 'text',
      id: 'text-textfield',
      name: 'title',
      text: 'Text:',
      isRequire: true,
    },
    {
      type: 'number',
      id: 'timeout-textfield',
      name: 'timeout',
      text: 'Close time:',
      isRequire: true,
    },
    {
      type: 'radio',
      id: 'error-radio',
      name: 'typeToast',
      text: 'Error',
      value: ToastrType.ERROR,
      checked: true,
    },
    {
      type: 'radio',
      id: 'success-radio',
      name: 'typeToast',
      text: 'Success',
      value: ToastrType.SUCCESS,
      checked: false,
    },
    {
      type: 'radio',
      id: 'warning-radio',
      name: 'typeToast',
      text: 'Warning',
      value: ToastrType.WARNING,
      checked: false,
    },
    {
      type: 'radio',
      id: 'info-radio',
      name: 'typeToast',
      text: 'Info',
      value: ToastrType.INFO,
      checked: false,
    }
  ]
};