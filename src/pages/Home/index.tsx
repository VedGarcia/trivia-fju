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
        <div className="mb-12 flex flex-col gap-2">
          <button
            onClick={() => navigate("/game")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl px-12 py-6 rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-4"
          >
            🎮 Iniciar Juego
          </button>
          <button
            onClick={() => navigate("/game")}
            className="bg-sky-800 hover:bg-cyan-700 text-white font-bold text-2xl px-8 py-6 rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-4"
          >
            Añadir equipos y preguntas
          </button>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-6 items-center">
          {/* Botón de administración */}
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
