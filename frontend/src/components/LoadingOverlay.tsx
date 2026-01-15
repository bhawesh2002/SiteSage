export function LoadingOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-20 rounded-xl overflow-hidden">
      {/* Dim layer */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Shimmer */}
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/20 to-transparent" />

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-white">
          Analyzing website…
        </span>
      </div>
    </div>
  );
}
