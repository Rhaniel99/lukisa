import { useCallback, useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import { AccountSchema } from "@/Lib/validation/account";
import { SettingsUser } from "@/Types/Settings";
import { useNotify } from "@/Hooks/useNotify";

export function useAccountForm(user: SettingsUser) {
  const notify = useNotify();

  const {
    data,
    setData,
    post,
    processing,
    errors,
    recentlySuccessful,
    reset,
    isDirty,
  } = useForm({
    email: user.email || "",
    password: "",
    password_confirmation: "",
    _method: "PATCH",
  });

  const [justSaved, setJustSaved] = useState(false);

  // Adicione a função interact
  const interact = useCallback(() => {
    if (justSaved) setJustSaved(false);
  }, [justSaved]);

  const emailChanged = useMemo(
    () => data.email.trim() !== user.email,
    [data.email, user.email]
  );

  const passwordChanged = useMemo(
    () => data.password.length > 0 || data.password_confirmation.length > 0,
    [data.password, data.password_confirmation]
  );

  const passwordsMatch = useMemo(
    () => data.password === data.password_confirmation && data.password.length >= 6,
    [data.password, data.password_confirmation]
  );

  // Lógica simplificada - similar ao ProfileTab
  const hasValidChanges = useMemo(() => {
    // Se email mudou e (não há senha OU senhas são válidas)
    if (emailChanged && (!passwordChanged || passwordsMatch)) {
      return true;
    }
    
    // Se há senha e as senhas são válidas
    if (passwordChanged && passwordsMatch) {
      return true;
    }
    
    return false;
  }, [emailChanged, passwordChanged, passwordsMatch]);

  const submit = useCallback(() => {
    const parsed = AccountSchema.safeParse({
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      Object.values(fieldErrors).flat().forEach((msg) => notify.error(msg));
      return;
    }

    post(route("profile.update"), {
      preserveScroll: true,
      onSuccess: () => {
        setJustSaved(true);
        reset("password", "password_confirmation");
        notify.success("Conta atualizada com sucesso!");
      },
    });
  }, [data, post, reset, notify]);

  return {
    data,
    setData,
    submit,
    processing,
    errors,
    recentlySuccessful,
    isDirty,
    justSaved,
    interact,
    hasValidChanges, 
    passwordsMatch, 
    passwordChanged, 
  };
}