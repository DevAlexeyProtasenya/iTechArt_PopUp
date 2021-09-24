export enum ToastrType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
  WRONG = '',
}

export enum ToastrImages {
  ERROR = './public/toastIcons/error.svg',
  WARNING = './public/toastIcons/warning.svg',
  SUCCESS = './public/toastIcons/success.svg',
  INFO = './public/toastIcons/info.svg',
}

export type ButtonSettingsType = {
  type: string;
  action: string;
  handler: (event: Event) => void;
  content: string;
  classes: string[];
};

export type FieldType = {
  type: string;
  text: string;
  id?: string;
  name?: string;
  isRequire?: boolean;
  value?: string;
  checked?: boolean;
};

export type FormSettingsType = {
  handler: (form: HTMLFormElement) => void;
  fields: FieldType[];
};

export type ToastrSettingsType = {
  text: string;
  title: string;
  type: ToastrType;
  timeout?: number;
};
