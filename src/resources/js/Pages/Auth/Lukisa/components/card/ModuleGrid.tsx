export function ModulesGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
      {children}
    </div>
  );
}
