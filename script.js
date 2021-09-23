(function () {
  var toastField = document.querySelector('.toasts');
  var toastButtonsField = document.querySelector('.toast__buttons');
  var formButton = document.getElementById('new');

  function renderToast(event){
    if(!event.target.classList.contains('toast__buttons')){
      const toastType = event.target.id;
      var toast = createToastr(toastType);
      if(toast){
        toast.render(toastField);
      }
    }
  }

  function createToastr(toastType){
    var toast;
    switch(toastType){
      case 'success': {
        toast = new Toastr(
          'Everything is fine!',
          'Success!!!',
          ToastrType.SUCCESS);
        break;
      }
      case 'error': {
        toast = new Toastr(
          'Oops, something is wrong!',
          'Error!!!',
          ToastrType.ERROR);
        break;
      }
      case 'warning': {
        toast = new Toastr(
          'There are some warnings!',
          'Warning!!!',
          ToastrType.WARNING);
        break;
      }
      case 'info': {
        toast = new Toastr(
          'Some usefull information!',
          'Info!!!',
          ToastrType.INFO);
        break;
      }
    }
    return toast;
  }

  toastButtonsField.addEventListener('click', renderToast);

  function viewForm(){
    var modal = new Form(toastFormFields);
    modal.render(document.body);
  }

  formButton.addEventListener('click', viewForm);
})();