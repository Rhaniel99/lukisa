import { router, usePage } from '@inertiajs/react'
import { useCallback } from 'react'

type PreloadKeys = string[]

interface Options {
    only: PreloadKeys
}

export function useInertiaPreload({ only }: Options) {
    const { props } = usePage()

    const preload = useCallback(() => {
        const hasAllProps = only.every(
            (key) => props[key] !== undefined
        )

        if (hasAllProps) return

        router.reload({
            only,
        })
    }, [props, only])

    return preload
}
