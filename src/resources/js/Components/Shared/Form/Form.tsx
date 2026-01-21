interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: () => void;
}

export function Form({ onSubmit, children, ...props }: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      {...props}
    >
      {children}
    </form>
  );
}