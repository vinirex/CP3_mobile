# Dynamic Form Generator from JSON

Este é um aplicativo mobile desenvolvido com **React Native, Expo SDK 55, TypeScript e AsyncStorage**. O objetivo principal do projeto é renderizar dinamicamente um formulário completo a partir de uma estrutura de configuração em formato JSON, simulando cenários corporativos reais.

---
# Grupo
Diogo Julio - RM553837
Vinicius Silva - RM553240
Victor Didoff - RM552965
Matheus Zottis - RM94119
Jonata Rafael - RM552939
---

## 🚀 Tecnologias Utilizadas

- **React Native** & **Expo SDK 55**
- **TypeScript** (tipagem estrita, livre do uso de `any`)
- **AsyncStorage** (para persistência local dos dados salvos)
- **Flexbox** & **StyleSheet** (para design responsivo e fluidez visual)

---

## 🎨 Design & Funcionalidades

O projeto conta com uma interface altamente polida e moderna:
- **Geração Dinâmica:** O formulário percorre a configuração JSON e instancia os componentes necessários sem marcações manuais.
- **Campos Suportados:**
  - `text` (Input padrão de texto)
  - `email` (Input com validação regex e teclado apropriado)
  - `password` (Input com opção de ocultar/revelar senha)
  - `number` (Input numérico)
  - `multiline` (Textarea para textos longos)
  - `select` (Dropdown elegante implementado via Modal Bottom-Sheet)
  - `radio` (Seleção única com botões circulares animados)
  - `checkbox` (Toggle quadrado customizado para termos de uso)
  - `switch` (Componente Switch padrão para preferências rápidas)
  - `date` (Seletor de data de três colunas (Dia, Mês e Ano) integrado em Modal)
- **Validação de Campos:** Valida campos obrigatórios, formatos de e-mail e formatos de data na submissão, com mensagens de erro individuais e banners informativos.
- **Persistência de Dados:** Salva os dados localmente ao submeter, restaura-os automaticamente ao abrir o aplicativo e permite limpar o histórico com um clique.
- **Responsividade Web:** Ajuste automático com largura máxima de visualização centralizada para navegadores web.

---

## 📂 Estrutura de Pastas

```text
CP3_mobile/
├── assets/                  # Imagens e ícones estáticos
│   └── dynamic_form_mockup.png
├── src/
│   ├── components/          # Componentes reutilizáveis do formulário
│   │   ├── DynamicField.tsx
│   │   ├── FormCheckboxInput.tsx
│   │   ├── FormDatePicker.tsx
│   │   ├── FormRadioInput.tsx
│   │   ├── FormSelectInput.tsx
│   │   └── FormTextInput.tsx
│   ├── config/              # Configurações estáticas do formulário (JSON)
│   │   └── formConfig.ts
│   ├── hooks/               # Custom hooks (validação e estados)
│   │   └── useForm.ts
│   ├── services/            # Serviços (Persistência no AsyncStorage)
│   │   └── storage.ts
│   └── types/               # Definições de tipos TypeScript
│       └── form.ts
├── App.tsx                  # Ponto de entrada do aplicativo
├── package.json             # Dependências e scripts
└── tsconfig.json            # Configuração do TypeScript
```

---

## 📸 Capturas de Tela (Mockup)

![Interface do Aplicativo](./assets/dynamic_form_mockup.png)

---

## ⚙️ Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador.

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento do Expo:**
   ```bash
   npx expo start
   ```
   *Pressione `a` para rodar no emulador Android, `i` para rodar no simulador iOS, ou escaneie o QR Code no seu dispositivo físico usando o aplicativo **Expo Go**.*

3. **Inicie o projeto diretamente no Navegador (Web):**
   ```bash
   npx expo start --web
   ```

---

## 👥 Integrantes

- Nome do Integrante 1 — RMxxxxx
- Nome do Integrante 2 — RMxxxxx
- Nome do Integrante 3 — RMxxxxx
