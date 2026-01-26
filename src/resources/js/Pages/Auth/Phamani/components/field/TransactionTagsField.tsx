import { useState } from "react";

interface TransactionTagsFieldProps {
  tags: { id?: string; name: string }[]
  onChange: (tags: { id?: string; name: string }[]) => void
}

export function TransactionTagsField({
  tags,
  onChange,
}: TransactionTagsFieldProps) {
  const [input, setInput] = useState('')

  function addTag() {
    const value = input.trim()
    if (!value) return

    if (tags.some(t => t.name.toLowerCase() === value.toLowerCase())) {
      setInput('')
      return
    }

    onChange([...tags, { name: value }])
    setInput('')
  }

  function removeTag(index: number) {
    onChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-serif text-[#6B4E3D] ml-1">
        Tags
      </label>

      <div className="flex flex-wrap gap-2 p-3 bg-white border-2 border-[#E8DCC4] rounded-xl">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 px-3 py-1 rounded-full
                       bg-[#E8DCC4] text-[#3D2817] text-sm"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-[#8B7355] hover:text-[#D4183D]"
            >
              ×
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
          placeholder="Adicionar tag"
          className="flex-1 min-w-[120px] outline-none text-sm text-[#3D2817]"
        />
      </div>

      <p className="text-xs text-[#8B7355]">
        Pressione Enter para adicionar
      </p>
    </div>
  )
}
