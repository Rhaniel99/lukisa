import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { AvatarUploader } from "@/Components/Shared/Avatar/AvatarUploader";
import { Form } from "@/Components/Shared/Form/Form";
import { ProfileUser } from "@/Types/ProfileUser";
import { useProfileForm } from "@/Layouts/Auth/hooks/useProfileForm";

interface Props {
  user: ProfileUser;
}

export function ProfileTab({ user }: Props) {
  const {
    data,
    setData,
    submit,
    processing,
    errors,
    isDirty,
    avatarChanged,
    justSaved,
    interact,
    recentlySuccessful,
  } = useProfileForm(user);

  return (
    <Form onSubmit={submit} className="max-w-2xl space-y-10">

      <h2 className="text-2xl font-bold text-[#3D2817]">Meu Perfil</h2>

      <AvatarUploader
        currentAvatarUrl={user.avatar_url}
        username={user.username}
        history={user.avatar_history}
        selectedHistoryId={data.media_id}
        onAvatarChange={(file) => {
          interact();
          setData("avatar", file);
          setData("media_id", null);
        }}
        onHistorySelect={(id, url) => {
          interact();
          setData("media_id", id);
          setData("avatar", null);
        }}
        onInteract={interact}
      />

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Nome Completo</Label>
          <Input
            value={data.fullname}
            onChange={(e) => {
              interact();
              setData("fullname", e.target.value);
            }}
          />
          {errors.fullname && <p className="text-red-600">{errors.fullname}</p>}
        </div>

        <div className="space-y-2">
          <Label>Nome de Usuário</Label>
          <Input
            value={data.username}
            onChange={(e) => {
              interact();
              setData("username", e.target.value);
            }}
          />
          {errors.username && <p className="text-red-600">{errors.username}</p>}
        </div>

        <Button
          type="submit"
          disabled={processing || justSaved || (!isDirty && !avatarChanged)}
          className="px-6 py-3 bg-[#6B4E3D] text-[#F5EFE6] rounded-lg"
        >
          {processing ? "Salvando..." : "Salvar Alterações"}
        </Button>

        {recentlySuccessful && (
          <span className="text-sm text-[#8B9A7E]">Salvo com sucesso!</span>
        )}
      </div>

    </Form>
  );
}
