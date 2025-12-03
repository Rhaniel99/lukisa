import React, { FormEvent } from 'react';

// Definimos os tipos das props que nosso componente irá aceitar.
// Ele aceita todas as props de um formulário HTML normal (como className, id, etc.)
// e uma prop especial `onSubmit` que é uma função que não recebe argumentos.
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: () => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children, ...props }) => {

  // Esta função interna é a que realmente lida com o evento do navegador.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 1. A parte "verborrágica" que queremos esconder.
    e.preventDefault();

    // 2. Chama a função limpa que recebemos via props.
    onSubmit();
  };

  return (
    // Passamos o nosso manipulador de evento e quaisquer outras props para a tag <form>.
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};
