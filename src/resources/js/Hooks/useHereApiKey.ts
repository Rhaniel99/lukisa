export function useHereApiKey() {
  const key = import.meta.env.VITE_HERE_API_KEY
  if (!key) {
    throw new Error(
      'VITE_HERE_API_KEY não está definido no seu .env — configure e reinicie o dev server'
    )
  }
  return key
}
