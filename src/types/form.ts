export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'multiline'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date';

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  options?: FormFieldOption[];
  placeholder?: string;
}

export interface FormConfig {
  title: string;
  fields: FormField[];
}

export type FormDataValue = string | boolean;

export type FormData = Record<string, FormDataValue>;

export type FormErrors = Record<string, string>;
