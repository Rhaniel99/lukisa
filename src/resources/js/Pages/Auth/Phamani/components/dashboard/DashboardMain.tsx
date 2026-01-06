interface DashboardMainProps {
  left: React.ReactNode
  right: React.ReactNode
}

export function DashboardMain({ left, right }: DashboardMainProps) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-9 space-y-8">
        {left}
      </div>

      <div className="lg:col-span-3 space-y-8">
        {right}
      </div>
    </main>
  )
}