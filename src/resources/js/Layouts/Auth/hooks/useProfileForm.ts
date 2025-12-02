import { useCallback, useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import { ProfileSchema } from "@/Lib/validation/profile";
import { ProfileUser } from "@/Types/ProfileUser";
import { useNotify } from "@/Hooks/useNotify";

export function useProfileForm(user: ProfileUser) {
  const notify = useNotify();

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
    isDirty,
    recentlySuccessful,
  } = useForm({
    fullname: user.fullname,
    username: user.username,
    avatar: null as File | null,
    media_id: null as number | null,
    _method: "PATCH",
  });

  const [justSaved, setJustSaved] = useState(false);

  const avatarChanged = useMemo(
    () => Boolean(data.avatar || data.media_id),
    [data.avatar, data.media_id]
  );

  const interact = useCallback(() => {
    if (justSaved) setJustSaved(false);
  }, [justSaved]);

  const submit = useCallback(() => {
    const parsed = ProfileSchema.safeParse({
      fullname: data.fullname,
      username: data.username,
      media_id: data.media_id,
    });

    if (!parsed.success) {
      const formatted = parsed.error.flatten().fieldErrors;
      Object.values(formatted).flat().forEach((msg) => notify.error(msg));
      return;
    }

    post(route("profile.update"), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        reset("avatar", "media_id");
        setJustSaved(true);
        notify.success("Perfil atualizado com sucesso!");
      },
    });
  }, [data.fullname, data.username, data.media_id, post, reset]);

  return {
    data,
    setData,
    submit,
    processing,
    errors,
    recentlySuccessful,
    isDirty,
    justSaved,
    avatarChanged,
    interact,
  };
}
