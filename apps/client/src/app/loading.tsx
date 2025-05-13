'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative w-16 h-16">
        <span className="absolute inset-0 rounded-full border-3 border-blue-900 opacity-75 animate-ping" />
        <span className="absolute inset-0 rounded-full border-3 border-blue-900" />
      </div>
    </div>
  );
}
