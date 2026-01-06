import { useForm } from '@inertiajs/react'
import { CreateTransaction } from '@/Types/Phamani/Transaction'

interface TransactionFormDefaults extends CreateTransaction { }

export function useTransactions() {
    const create = useCreateTransactionForm()
    //   const update = useUpdateTransactionForm()
    //   const destroy = useDeleteTransaction()

    return {
        create,
        // update,
        // destroy,
    }
}

function useCreateTransactionForm() {
    const form = useForm<TransactionFormDefaults>(transactionDefaults())

    function submit(payload: CreateTransaction) {
        form.setData(payload)

        form.post(route('transaction.store'), {
            preserveScroll: true,
        })
    }

    return {
        submit,

        processing: form.processing,
        errors: form.errors,
        recentlySuccessful: form.recentlySuccessful,

        reset: form.reset,
        clearErrors: form.clearErrors,
    }
}

/* -------------------------------------------------------------------------- */
/*                             UPDATE TRANSACTION                              */
/* -------------------------------------------------------------------------- */

// function useUpdateTransactionForm() {
//   const form = useForm<TransactionFormDefaults>(transactionDefaults())

//   function load(transaction: Transaction) {
//     form.setData({
//       description: transaction.description,
//       amount: transaction.amount,
//       type: transaction.type,
//       category_id: transaction.category_id,
//       account_id: transaction.account_id,
//       date: transaction.date,
//     })
//   }

//   function submit(id: string) {
//     form.put(route('transaction.update', id), {
//       preserveScroll: true,
//     })
//   }

//   return {
//     load,
//     submit,

//     processing: form.processing,
//     errors: form.errors,
//     recentlySuccessful: form.recentlySuccessful,

//     reset: form.reset,
//   }
// }

/* -------------------------------------------------------------------------- */
/*                             DELETE TRANSACTION                              */
/* -------------------------------------------------------------------------- */

// function useDeleteTransaction() {
//   const [processing, setProcessing] = useState(false)

//   function destroy(id: string) {
//     setProcessing(true)

//     router.delete(route('transaction.destroy', id), {
//       preserveScroll: true,
//       onFinish: () => setProcessing(false),
//     })
//   }

//   return {
//     destroy,
//     processing,
//   }
// }

function transactionDefaults(): CreateTransaction {
    return {
        description: '',
        amount: 0,
        type: 'expense',
        category_id: '',
        account_id: '',
        date: new Date().toISOString().split('T')[0],
    }
}