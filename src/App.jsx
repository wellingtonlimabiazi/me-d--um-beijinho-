import { useState, useRef } from "react";

const noMessages = [
  "Não 😢",
  "Tem certeza? 🥺",
  "Pensa bem, João... 💭",
  "Vai me deixar triste? 😭",
  "Só mais uma chance? 🙏",
  "Você clicou errado, né? 😅",
  "Respira e pensa de novo... 😌",
  "Eu fiz isso com muito amor! 💖",
  "Última chance, vai? 🥹",
  "Não tem como negar! 😎",
];

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleNo = () => {
    if (noCount < noMessages.length - 1) {
      setNoCount((c) => c + 1);
    }

    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    setAccepted(true);
  };

  const yesScale = 1 + noCount * 0.3;
  const noScale = Math.max(0.3, 1 - noCount * 0.08);

  if (accepted) {
    return (
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="text-8xl mb-6 animate-bounce-slow">🥰</div>
        <h1 className="text-4xl md:text-6xl font-bold text-pink-700 mb-4">
          Sabia que você ia dizer SIM! 💖
        </h1>
        <p className="text-xl md:text-2xl text-pink-600 mb-8">
          Quero muitos beijinhos João Victor! 💑
        </p>
        <div className="text-6xl animate-heart-beat">❤️</div>
        <p className="mt-8 text-pink-500 text-sm">
          Feito com muito amor pelo seu Weliton 💌
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center"
    >
      <div className="floating-hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              fontSize: `${16 + Math.random() * 24}px`,
            }}
          >
            {["❤️", "💖", "💕", "💗", "💘"][i % 5]}
          </span>
        ))}
      </div>

      <div className="text-8xl md:text-9xl mb-6 animate-bounce-slow select-none">
        🧸
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-pink-700 mb-3 drop-shadow">
        João Victor...
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-pink-600 mb-10 drop-shadow">
        Me dá um beijinho? 💘
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <button
          onClick={handleYes}
          style={{ transform: `scale(${yesScale})` }}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-xl md:text-2xl px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl active:scale-95"
        >
          Sim! 💖
        </button>

        <button
          onClick={handleNo}
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
          }}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md transition-all duration-200"
        >
          {noMessages[noCount]}
        </button>
      </div>

      {noCount > 3 && (
        <p className="mt-8 text-pink-600 font-semibold animate-pulse">
          Weliton está esperando... 🥺💕
        </p>
      )}

      <p className="absolute bottom-4 text-pink-500 text-xs md:text-sm">
        Feito com ❤️ por Weliton, para João Victor
      </p>
    </div>
  );
}
