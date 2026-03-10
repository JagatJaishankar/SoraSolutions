"use client";

export default function BrowserMockup({ children, className = "" }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-white/20 shadow-lg ${className}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-black/[0.04] border-b border-black/5">
        <div className="w-3 h-3 rounded-full bg-black/20" />
        <div className="w-3 h-3 rounded-full bg-black/15" />
        <div className="w-3 h-3 rounded-full bg-black/10" />
        <div className="flex-1 mx-3">
          <div className="h-5 rounded-md bg-black/[0.04] max-w-[200px]" />
        </div>
      </div>

      {/* Content area */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
