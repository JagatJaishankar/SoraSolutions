export default function Badge({ children, pulse = false, className = "" }) {
  return (
    <span
      className={`glass-light px-4 py-1.5 rounded-full inline-flex items-center gap-2 ${className}`}
    >
      {pulse && (
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      )}
      <span className="text-xs font-semibold tracking-widest uppercase text-black/70">
        {children}
      </span>
    </span>
  );
}
