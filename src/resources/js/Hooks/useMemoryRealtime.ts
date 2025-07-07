import { useEffect, useRef, useState } from 'react'
import { Memory } from '@/Types/models'

type LikeEvent = { id: number; likesCount: number }

export function useMemoryRealtime(initialMemories: Memory[]) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories)

  /** Guarda pares {channelName, handler} para remover depois */
  const subscriptions = useRef<{ channel: any; handler: (e: LikeEvent) => void }[]>([])

  // 1) Sempre que as memórias mudarem (entrada do Inertia), sobrescreve estado
  useEffect(() => setMemories(initialMemories), [initialMemories])

  // 2) (Re)inscreve‑se só quando a lista de IDs muda
  useEffect(() => {
    const ids = memories.map(m => m.id)

    // evita repetir handlers: sai de todos os canais antigos
    subscriptions.current.forEach(({ channel, handler }) =>
      channel.stopListening('.memory.like.updated', handler)
    )
    subscriptions.current = []

    ids.forEach(id => {
      const channel = window.Echo.channel(`memories.${id}`)
      const handler = (e: LikeEvent) => {
        setMemories(curr =>
          curr.map(m => (m.id === e.id ? { ...m, likes: e.likesCount } : m))
        )
      }
      channel.listen('.memory.like.updated', handler)
      subscriptions.current.push({ channel, handler })
    })

    // cleanup ao desmontar
    return () => {
      subscriptions.current.forEach(({ channel, handler }) =>
        channel.stopListening('.memory.like.updated', handler)
      )
      subscriptions.current = []
    }
  }, [memories.map(m => m.id).join(',')]) // só muda se aparecer ou sumir um ID

  return { memories, setMemories }
}
