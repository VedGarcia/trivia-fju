import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {/* Título del juego */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            🎯 Trivia FJU
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Juego de Preguntas y Respuestas
          </p>
        </div>

        {/* Botón principal para iniciar juego */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/game")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl px-12 py-6 rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-4"
          >
            🎮 Iniciar Juego
          </button>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-6 items-center">
          {/* Botón de administración */}
          <button
            onClick={() => navigate("/admin")}
            className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-4"
            aria-label="Administración"
          >
            <svg
              className="w-12 h-12 text-white mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-white font-semibold text-sm">Admin</span>
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-center max-w-2xl">
          <p className="text-white/80 text-sm md:text-base">
            Crea preguntas, forma equipos y compite en este emocionante juego de
            trivia. Gestiona las preguntas desde el panel de administración y
            disfruta del juego con tus amigos.
          </p>
        </div>
      </div>
    </Layout>
  );
};
