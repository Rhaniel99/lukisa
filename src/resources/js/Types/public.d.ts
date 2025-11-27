// types/public.d.ts
export interface ForgotPageProps {
    user_verified?: boolean;
    verified_email?: string;
    errors: { email?: string };
}

export interface ForgotFormData {
    email: string;
    birth_date: string;
    password: string;
    password_confirmation: string;
}

export interface ForgotFormActions {
    setData: (key: keyof ForgotFormData, value: string) => void;
    handleCheckUser: () => void;
    handleResetPassword: () => void;
}