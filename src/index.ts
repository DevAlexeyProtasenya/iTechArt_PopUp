import Form from 'components/form/Form';
import { ToastrType } from 'common/common';
import toastFormFields from 'common/toastForm';
import Toastr from 'components/toastr/Toastr';
import 'src/style';

const toastButtonsField = document.querySelector('.toast__buttons');
const formButton = document.getElementById('new');

const createToastr = (toastType: ToastrType): Toastr | null => {
  let toast;
  switch (toastType) {
    case 'success': {
      toast = new Toastr({
        text: 'Everything is fine!',
        title: 'Success!!!',
        type: ToastrType.SUCCESS,
      });
      break;
    }
    case 'error': {
      toast = new Toastr({
        text: 'Oops, something is wrong!',
        title: 'Error!!!',
        type: ToastrType.ERROR,
      });
      break;
    }
    case 'warning': {
      toast = new Toastr({
        text: 'There are some warnings!',
        title: 'Warning!!!',
        type: ToastrType.WARNING,
      });
      break;
    }
    case 'info': {
      toast = new Toastr({
        text: 'Some usefull information!',
        title: 'Info!!!',
        type: ToastrType.INFO,
      });
      break;
    }
    default:
      return null;
  }
  return toast;
};

const renderToast = (event: Event) => {
  const button = event.target ? (event.target as HTMLButtonElement) : null;
  if (button) {
    if (!button.classList.contains('toast__buttons')) {
      const toastType = button.id;
      const toast = createToastr(toastType as ToastrType);
      if (toast) {
        toast.render();
      }
    }
  }
};

if (toastButtonsField) {
  toastButtonsField.addEventListener('click', renderToast);
}

const viewForm = () => {
  const modal = new Form(toastFormFields);
  modal.render();
};

if (formButton) {
  formButton.addEventListener('click', viewForm);
}
