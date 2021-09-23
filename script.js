import Toastr from "./components/toastr/Toastr.js";
import { ToastrType } from "./common/common.js";

const toastField = document.querySelector('#toasts');
const toastButtonsField = document.querySelector('.toast__buttons');
const formButton = document.getElementById('new');

const renderToast = event => {
  if(!event.target.classList.contains('toast__buttons')){
    const toastType = event.target.id;
    var toast = createToastr(toastType);
    if(toast){
      toast.render();
    }
  }
}

const createToastr = toastType => {
  let toast;
  switch(toastType){
    case 'success': {
      toast = new Toastr({
        text: 'Everything is fine!',
        title: 'Success!!!',
        type: ToastrType.SUCCESS
      });
      break;
    }
    case 'error': {
      toast = new Toastr({
        text: 'Oops, something is wrong!',
        title: 'Error!!!',
        type: ToastrType.ERROR
      });
      break;
    }
    case 'warning': {
      toast = new Toastr({
        text: 'There are some warnings!',
        title: 'Warning!!!',
        type: ToastrType.WARNING
      });
      break;
    }
    case 'info': {
      toast = new Toastr({
        text: 'Some usefull information!',
        title: 'Info!!!',
        type: ToastrType.INFO
      });
      break;
    }
  }
  return toast;
}

toastButtonsField.addEventListener('click', renderToast);