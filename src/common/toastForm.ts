import Toastr from 'components/toastr/Toastr';
import { FormSettingsType, ToastrType } from 'common/common';

const toastFormFields: FormSettingsType = {
  handler: (form: HTMLFormElement) => {
    const title = form.querySelector(
      '#title-textfield',
    ) as HTMLInputElement | null;
    const text = form.querySelector(
      '#text-textfield',
    ) as HTMLInputElement | null;
    const timeout = form.querySelector(
      '#timeout-textfield',
    ) as HTMLInputElement | null;
    const types = document.getElementsByName(
      'typeToast',
    ) as NodeListOf<HTMLInputElement>;
    let typeToast = '';
    types.forEach(type => {
      if (type.checked) typeToast = type.value;
    });
    if (title && text && timeout) {
      const toast = new Toastr({
        text: text.value,
        title: title.value,
        type: typeToast as ToastrType,
        timeout: parseInt(timeout.value, 10),
      });
      toast.render();
    }
  },
  fields: [
    {
      type: 'header',
      text: 'Toast form',
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
    },
  ],
};

export default toastFormFields;
