export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)] z-50">
      <div
        className="w-8 h-8 rounded-full border-2 border-[var(--color-surface-container-high)] border-t-[var(--color-primary)] animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
