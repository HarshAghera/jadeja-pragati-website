"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative w-16 h-16">
        <span className="absolute inset-0 rounded-full border-4 border-blue-900 opacity-50 animate-ping-fast" />
        <span className="absolute inset-0 rounded-full border-4 border-blue-900" />
      </div>

      <style jsx>{`
        @keyframes ping-fast {
          0% {
            transform: scale(0);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .animate-ping-fast {
          animation: ping-fast 0.6s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
