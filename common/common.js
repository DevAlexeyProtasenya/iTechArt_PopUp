var ToastrType = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
}

var ToastrImages = {
  ERROR: './public/toastIcons/error.svg',
  WARNING: './public/toastIcons/warning.svg',
  SUCCESS: './public/toastIcons/success.svg',
  INFO: './public/toastIcons/info.svg',
}

var toastFormFields = {
  handler: function(form) {
    var title = form.querySelector('#title-textfield').value;
    var text = form.querySelector('#text-textfield').value;
    var timeout = form.querySelector('#timeout-textfield').value; 
    var types = document.getElementsByName('typeToast');
    var typeToast;
    for(var i = 0; i < types.length; i++) {
      if(types[i].checked) {
        typeToast = types[i].value;
      }
    }
    var toast = new Toastr(text, title, typeToast, timeout);
    var toastField = document.querySelector('.toasts');
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