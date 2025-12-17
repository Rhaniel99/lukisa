export function submitOnEnter(
  e: React.KeyboardEvent<HTMLInputElement>,
  formRef: React.RefObject<HTMLInputElement>,
) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    formRef.current?.form?.requestSubmit();
  }
}