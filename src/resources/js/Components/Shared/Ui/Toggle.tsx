interface ToggleProps {
  label: string
  icon?: React.ReactNode
  active: boolean
  onToggle: () => void
}

export default function Toggle({ label, icon, active, onToggle }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#FBF7F1]
                    rounded-xl border border-[#E8DCC4]">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
            {icon}
          </div>
        )}
        <span className="text-[#3D2817] font-medium">{label}</span>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={`w-12 h-7 rounded-full p-1 transition-colors ${
          active ? 'bg-[#6B4E3D]' : 'bg-[#D4C5A9]'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
            active ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

