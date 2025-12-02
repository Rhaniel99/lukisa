import { Form } from "@/Components/UI/Form";
import { Button } from "@/Components/ui/button";
import { motion } from "motion/react";
import { SettingsUser } from "@/Types/Settings";
import { usePrivacyForm } from "@/Layouts/Auth/hooks/usePrivacyForm";

interface PrivacyTabProps {
  user: SettingsUser;
}

export const PrivacyTab = ({ user }: PrivacyTabProps) => {
    
  const {
    data,
    setData,
    submit,
    processing,
    errors,
    recentlySuccessful,
    justSaved,
    hasChanges,
    interact,
  } = usePrivacyForm(user);

  const privacyOptions = [
    { 
      value: "public" as const, 
      label: "Público", 
      desc: "Qualquer um pode ver" 
    },
    { 
      value: "friends" as const, 
      label: "Amigos", 
      desc: "Apenas seus amigos" 
    },
    { 
      value: "private" as const, 
      label: "Somente Eu", 
      desc: "Privado" 
    },
  ];

  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-[#3D2817] mb-2">Privacidade</h2>
        <p className="text-[#6B4E3D] mb-8">
          Gerencie quem pode ver seu conteúdo e interagir com você.
        </p>

        <Form onSubmit={submit} className="space-y-8">
          {/* Visibilidade das Memórias */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DCC4]">
            <h3 className="text-lg font-bold text-[#3D2817] mb-4">
              Quem pode ver minhas memórias?
            </h3>

            <div className="space-y-4">
              {privacyOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={() => {
                    interact();
                    setData("privacy", option.value);
                  }}
                >
                  <div className="relative flex items-center mt-1">
                    <input
                      type="radio"
                      name="visibility"
                      className="peer sr-only"
                      checked={data.privacy === option.value}
                      onChange={() => {
                        interact();
                        setData("privacy", option.value);
                      }}
                    />
                    <div 
                      className={`w-5 h-5 border-2 rounded-full transition-colors ${
                        data.privacy === option.value
                          ? "border-[#3D2817] bg-[#3D2817]"
                          : "border-[#6B4E3D]"
                      }`}
                    />
                    <div 
                      className={`absolute w-2 h-2 bg-white rounded-full left-1.5 top-1.5 transition-opacity ${
                        data.privacy === option.value ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[#3D2817] font-medium">
                      {option.label}
                    </span>
                    <span className="text-sm text-[#8B7355]">
                      {option.desc}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {errors.privacy && (
              <p className="mt-3 text-sm text-red-600">{errors.privacy}</p>
            )}
          </div>

          {/* Pedidos de Amizade */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DCC4] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#3D2817] mb-1">
                Pedidos de Amizade
              </h3>
              <p className="text-sm text-[#8B7355]">
                Permitir que outros usuários enviem solicitações de amizade?
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => {
                interact();
                setData("allow_friend_requests", !data.allow_friend_requests);
              }}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                data.allow_friend_requests 
                  ? "bg-[#3D2817]" 
                  : "bg-[#D4C5A9]"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  data.allow_friend_requests 
                    ? "translate-x-6" 
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {errors.allow_friend_requests && (
            <p className="text-sm text-red-600">{errors.allow_friend_requests}</p>
          )}

          {/* Botão de Salvar */}
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={processing || justSaved || !hasChanges}
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
              {processing ? "Salvando..." : "Salvar Preferências"}
            </Button>

            {recentlySuccessful && (
              <span className="text-sm text-[#8B9A7E] animate-pulse">
                Preferências salvas!
              </span>
            )}
          </div>
        </Form>
      </motion.div>
    </div>
  );
};