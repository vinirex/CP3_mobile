import { FormConfig } from '../types/form';

export const formConfig: FormConfig = {
  title: 'Cadastro de Usuário',
  fields: [
    {
      id: 'name',
      label: 'Nome Completo',
      type: 'text',
      required: true,
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 'email',
      label: 'E-mail',
      type: 'email',
      required: true,
      placeholder: 'Digite seu endereço de e-mail',
    },
    {
      id: 'password',
      label: 'Senha',
      type: 'password',
      required: true,
      placeholder: 'Digite uma senha segura',
    },
    {
      id: 'age',
      label: 'Idade',
      type: 'number',
      required: true,
      placeholder: 'Digite sua idade',
    },
    {
      id: 'bio',
      label: 'Biografia',
      type: 'multiline',
      required: false,
      placeholder: 'Fale um pouco sobre você...',
    },
    {
      id: 'gender',
      label: 'Gênero',
      type: 'radio',
      required: true,
      options: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outro', value: 'other' },
      ],
    },
    {
      id: 'state',
      label: 'Estado (UF)',
      type: 'select',
      required: true,
      options: [
        { label: 'São Paulo (SP)', value: 'SP' },
        { label: 'Rio de Janeiro (RJ)', value: 'RJ' },
        { label: 'Minas Gerais (MG)', value: 'MG' },
        { label: 'Espírito Santo (ES)', value: 'ES' },
      ],
    },
    {
      id: 'birthDate',
      label: 'Data de Nascimento',
      type: 'date',
      required: true,
      placeholder: 'Selecione sua data de nascimento',
    },
    {
      id: 'terms',
      label: 'Aceito os termos de uso do aplicativo',
      type: 'checkbox',
      required: true,
    },
    {
      id: 'notifications',
      label: 'Desejo receber notificações por e-mail',
      type: 'switch',
      required: false,
    },
  ],
};
