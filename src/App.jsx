import { useState, useEffect } from "react";

// Frases quando ele tenta clicar em "Não"
const noMessages = [
  "Não 😢",
  "Tem certeza? 🥺",
  "Pensa bem, João... 💭",
  "Vai me deixar triste? 😭",
  "Só mais uma chance? 🙏",
  "Você tocou errado, né? 😅",
  "Respira e pensa de novo... 😌",
  "Eu fiz isso com muito amor! 💖",
  "Última chance, vai? 🥹",
  "Não tem como negar! 😎",
];

// Lista de emojis de coração
const hearts = ["❤️", "💖", "💕", "💗", "💘", "💝"];

// Detecta se é celular
const isMobile = () =>
  typeof window !== "undefined" &&
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isPhone, setIsPhone] = useState(false);

  // Saber se está no celular (pra ajustar comportamento)
  useEffect(() => {
    setIsPhone(isMobile());
  }, []);

  // ============== FUNÇÕES ==============
  const handleNo = () => {
    if (noCount < noMessages.length - 1) {
      setNoCount((c) => c + 1);
    }

    if (isPhone) {
      // No celular, o botão NÃO foge pra posições menores (evita sair da tela)
      const maxX = Math.min(window.innerWidth * 0.25, 100);
      const maxY = Math.min(window.innerHeight * 0.15, 80);
      const randomX = (Math.random() - 0.5) * 2 * maxX;
      const randomY = (Math.random() - 0.5) * 2 * maxY;
      setNoPosition({ x: randomX, y: randomY });
    } else {
      // No PC, foge mais longe
      const randomX = (Math.random() - 0.5) * 300;
      const randomY = (Math.random() - 0.5) * 300;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const handleYes = () => {
    setAccepted(true);
  };

  // Botão SIM cresce, botão NÃO encolhe
  const yesScale = 1 + noCount * 0.15;
  const noScale = Math.max(0.4, 1 - noCount * 0.06);

  // ============== TELA FINAL (ele disse SIM) ==============
  if (accepted) {
    return (
      <div className="page-container">
        {/* Corações flutuando também na tela final */}
        <FloatingHearts count={isPhone ? 12 : 18} />

        <div style={{ fontSize: isPhone ? "5rem" : "8rem" }} className="animate-bounce-slow">
          🥰
        </div>

        <h1 className="title-main" style={{ marginTop: "16px" }}>
          Sabia que você ia dizer SIM! 💖
        </h1>

        <p
          className="title-sub"
          style={{ marginTop: "20px", maxWidth: "600px" }}
        >
          Te amo, João Victor! Agora somos oficialmente namorados! 💑
        </p>

        <div
          className="animate-heart-beat"
          style={{ fontSize: isPhone ? "4rem" : "6rem", marginTop: "32px" }}
        >
          ❤️
        </div>

        <p
          style={{
            marginTop: "40px",
            color: "#db2777",
            fontSize: "0.9rem",
            opacity: 0.9,
          }}
        >
          Feito com muito amor pelo seu Weliton 💌
        </p>
      </div>
    );
  }

  // ============== TELA INICIAL (a pergunta) ==============
  return (
    <div className="page-container">
      {/* Corações flutuando */}
      <FloatingHearts count={isPhone ? 12 : 18} />

      {/* Ursinho */}
      <div className="bear animate-bounce-slow">🧸</div>

      {/* Pergunta */}
      <h1 className="title-main">João Victor...</h1>
      <h2 className="title-sub" style={{ marginTop: "12px" }}>
        Quer namorar comigo? 💘
      </h2>

      {/* Botões */}
      <div className="buttons-wrap">
        {/* BOTÃO SIM */}
        <button
          onClick={handleYes}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleYes();
          }}
          className="btn-touch btn-yes"
          style={{ transform: `scale(${yesScale})` }}
        >
          Sim! 💖
        </button>

        {/* BOTÃO NÃO */}
        <button
          onClick={handleNo}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleNo();
          }}
          className="btn-touch btn-no"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
            transition: "transform 0.25s ease-out",
          }}
        >
          {noMessages[noCount]}
        </button>
      </div>

      {/* Mensagem extra quando ele insiste em dizer não */}
      {noCount > 3 && (
        <p
          style={{
            marginTop: "32px",
            color: "#db2777",
            fontWeight: 600,
            fontSize: isPhone ? "1.1rem" : "1.25rem",
            animation: "heart-beat 1.5s ease-in-out infinite",
          }}
        >
          Weliton está esperando... 🥺💕
        </p>
      )}

      {/* Rodapé */}
      <p className="footer">Feito com ❤️ por Weliton, para João Victor</p>
    </div>
  );
}

// ============== COMPONENTE: CORAÇÕES FLUTUANDO ==============
function FloatingHearts({ count = 15 }) {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            fontSize: `${16 + Math.random() * 24}px`,
          }}
        >
          {hearts[i % hearts.length]}
        </span>
      ))}
    </div>
  );
}
