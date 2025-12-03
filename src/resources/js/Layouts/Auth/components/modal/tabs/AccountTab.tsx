import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/Shared/Form/Form";
import { SettingsUser } from "@/Types/Settings";
import { useAccountForm } from "@/Layouts/Auth/hooks/useAccountForm";

interface AccountTabProps {
  user: SettingsUser;
}

export function AccountTab({ user }: AccountTabProps) {
  
  const {
    data,
    setData,
    submit,
    processing,
    errors,
    recentlySuccessful,
    passwordsMatch,
    passwordChanged,
    hasValidChanges,
    justSaved,
    interact,
  } = useAccountForm(user);

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-[#3D2817] mb-8">
        Configurações da Conta
      </h2>

      <Form onSubmit={submit} className="space-y-8">
        {/* EMAIL */}
        <div className="space-y-2">
          <Label className="font-semibold text-[#3D2817]">Email</Label>

          <Input
            type="email"
            value={data.email}
            onChange={(e) => {
              interact();
              setData("email", e.target.value);
            }}
            className="
              w-full px-4 py-3 bg-[#E8DCC4]/30 
              border-2 border-[#D4C5A9] rounded-xl 
              text-[#3D2817]
              focus:border-[#6B4E3D] focus:outline-none
            "
          />

          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        {/* NOVA SENHA */}
        <div className="space-y-2">
          <Label className="font-semibold text-[#3D2817]">
            Nova Senha
          </Label>

          <Input
            type="password"
            placeholder="••••••••"
            value={data.password}
            onChange={(e) => {
              interact();
              setData("password", e.target.value);
            }}
            className="
              w-full px-4 py-3 bg-[#E8DCC4]/30 
              border-2 border-[#D4C5A9] rounded-xl 
              text-[#3D2817]
              focus:border-[#6B4E3D] focus:outline-none
            "
          />

          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </div>

        {/* CONFIRMAR SENHA */}
        <div className="space-y-2">
          <Label className="font-semibold text-[#3D2817]">
            Confirmar Nova Senha
          </Label>

          <Input
            type="password"
            placeholder="••••••••"
            value={data.password_confirmation}
            onChange={(e) => {
              interact();
              setData("password_confirmation", e.target.value);
            }}
            className={` 
              w-full px-4 py-3 bg-[#E8DCC4]/30 
              border-2 rounded-xl 
              text-[#3D2817]
              focus:border-[#6B4E3D] focus:outline-none
              ${passwordChanged && !passwordsMatch
                ? "border-red-500"
                : "border-[#D4C5A9]"
              }
            `}
          />

          {passwordChanged && !passwordsMatch && (
            <p className="text-sm text-red-600">
              As senhas não coincidem.
            </p>
          )}
        </div>

        {/* BOTÃO - Usando lógica similar ao ProfileTab */}
        <Button
          type="submit"
          disabled={processing || justSaved || !hasValidChanges}
          className="
            px-6 py-3 rounded-lg font-medium
            bg-[#6B4E3D] text-[#F5EFE6] 
            hover:bg-[#3D2817] 
            transition-colors

            disabled:opacity-50 
            disabled:cursor-not-allowed
            disabled:hover:bg-[#6B4E3D]
          "
        >
          {processing ? "Salvando..." : "Atualizar Conta"}
        </Button>

        {recentlySuccessful && (
          <span className="text-sm text-[#8B9A7E] animate-pulse">
            Dados atualizados com sucesso!
          </span>
        )}
      </Form>

      {/* SEÇÃO DELETAR */}
      <div className="border-t border-[#D4C5A9] mt-10 pt-8">
        <h3 className="text-lg font-bold text-[#3D2817] mb-4">
          Deletar Conta
        </h3>

        <p className="text-sm text-[#6B4E3D] mb-6 leading-relaxed">
          Essa ação é irreversível. Todas as suas informações, memórias,
          dados pessoais e configurações serão apagadas permanentemente.
        </p>

        <button
          className="
            px-6 py-3 bg-[#D4183D] text-white 
            rounded-lg font-medium 
            hover:bg-[#A3122E] transition-colors
          "
        >
          Deletar Minha Conta
        </button>
      </div>
    </div>
  );
}