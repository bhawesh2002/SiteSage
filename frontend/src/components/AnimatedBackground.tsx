export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="h-full w-full animate-gradient bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 bg-400%" />
      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
