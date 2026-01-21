import { Account } from '@/Types/Phamani'
import { router, useForm } from '@inertiajs/react'

export type CreateAccount = Omit<Account, 'id'>

export function useAccountsForm(onSuccess?: () => void) {
    const form = useForm<CreateAccount>({
        name: '',
        type: 'checking',
    })

    function submit() {
        form.post(route('account.store'), {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['categories', 'accounts'] })
                form.reset()
                onSuccess?.()
            },
        })
    }

    return {
        form,
        submit,
    }
}