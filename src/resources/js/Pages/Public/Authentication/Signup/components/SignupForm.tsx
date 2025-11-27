import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";
import { Calendar, Loader2, Lock, Mail, User } from "lucide-react";

export default function SignupForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        birth_date: "",
        password_confirmation: "",
    });

    const submit = () => {
        post(route("auth.register"), {
            onError: () => {
                reset("password", "password_confirmation");
            },
        });
    };

    return (
        <Form onSubmit={submit} className="space-y-5">
            {/* Full Name */}
            <div>
                <label htmlFor="name" className="block text-[#3D2817] mb-2">
                    Nome Completo
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Digite seu nome completo"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                        required
                        autoComplete="name"
                    />
                </div>
                {errors.name && (
                    <p className="mt-2 text-xs text-red-600">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-[#3D2817] mb-2">
                    Email
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                    <input
                        type="email"
                        id="email"
                        name="email"
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

            {/* Birth Date */}
            <div>
                <label htmlFor="birth_date" className="block text-[#3D2817] mb-2">
                    Data de Nascimento
                </label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                    <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        placeholder="dd/mm/aaaa"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                        required
                        autoComplete="bday"
                    />
                </div>
                {errors.birth_date && (
                    <p className="mt-2 text-xs text-red-600">{errors.birth_date}</p>
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
                        name="password"
                        placeholder="Crie uma senha"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                        required
                        autoComplete="new-password"
                    />
                </div>
                {errors.password && (
                    <p className="mt-2 text-xs text-red-600">{errors.password}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="password_confirmation" className="block text-[#3D2817] mb-2">
                    Confirmar Senha
                </label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder="Confirme sua senha"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                        required
                        autoComplete="new-password"
                    />
                </div>
                {errors.password_confirmation && (
                    <p className="mt-2 text-xs text-red-600">{errors.password_confirmation}</p>
                )}
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
                        Criando...
                    </>
                ) : (
                    "Criar Conta"
                )}
            </button>
        </Form>
    );
};
