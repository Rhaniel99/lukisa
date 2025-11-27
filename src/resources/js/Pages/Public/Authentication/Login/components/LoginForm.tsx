import { Link, useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";
import { Loader2, Lock, Mail } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";

export default function LoginForm () {
    // ? O hook useForm gerencia o estado do formulário para nós.
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: "",
        password: "",
        remember: false,
    });

    // ? Função que é chamada quando o formulário é enviado.
    const submit = () => {
        post(route("auth.login"), {
            onError: () => {
                reset("password");
            },
        });
    };

    return (
        <Form onSubmit={submit} className="space-y-5">
            <div>
                <label htmlFor="email" className="block text-[#3D2817] mb-2">
                    Email
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                        required
                        autoComplete="email"
                    />
                </div>
                {errors.email && (
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-[#3D2817] mb-2">
                    Senha
                </label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                        required
                        autoComplete="current-password"
                    />
                </div>
                {errors.password && (
                    <p className="mt-2 text-xs text-red-600">{errors.password}</p>
                )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(checked: CheckedState) =>
                            setData("remember", checked === true)
                        }
                        className="w-4 h-4 rounded border-[#C9B59A] text-[#6B4E3D] focus:ring-[#6B4E3D] data-[state=checked]:bg-[#6B4E3D]"
                    />
                    <span className="text-[#6B4E3D] text-sm">Lembrar-me</span>
                </label>
                <Link
                    href={route("form.forgot")}
                    className="text-[#6B4E3D] hover:text-[#3D2817] transition-colors text-sm"
                >
                    Esqueceu sua senha?
                </Link>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#6B4E3D] text-[#F5EFE6] py-4 rounded-xl hover:bg-[#3D2817] transition-colors shadow-lg disabled:bg-[#A69580] disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {processing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Entrando...
                    </>
                ) : (
                    "Entrar"
                )}
            </button>
        </Form>
    );
};
