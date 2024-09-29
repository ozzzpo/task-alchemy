export function DepartmentTag({ department }: { department: string }) {
  return (
    <div
      className={`h-fit min-w-20 w-fit rounded-lg text-xs px-2 py-1.5 flex items-center gap-1 ${
        department === 'Разработка'
          ? 'bg-green-200'
          : department === 'Продажи'
          ? 'bg-yellow-200'
          : 'bg-red-200'
      }`}
    >
      <div
        className={`min-w-1.5 min-h-1.5 rounded-full ${
          department === 'Разработка'
            ? 'bg-green-600'
            : department === 'Продажи'
            ? 'bg-yellow-600'
            : 'bg-red-600'
        }`}
      />
      <p className="text-neutral-600">{department}</p>
    </div>
  );
}
