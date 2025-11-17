import { useState } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/Layout";
import { Modal } from "../../components/Modal";
import { AddQuestion } from "../../components/AddQuestion";
import { EditQuestion } from "../../components/EditQuestion";
import { QuestionsList } from "../../components/QuestionsList";
import { TeamsPanel } from "../../components/TeamsPanel";
import type { Question } from "../../models/types";
import { resetGame, resetScores } from "../../features/game/gameSlice";

type Tab = "questions" | "teams";

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("questions");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const dispatch = useDispatch();

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSuccess = () => {
    handleCloseAddModal();
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingQuestion(null);
  };

  const handleEditSuccess = () => {
    handleCloseEditModal();
  };

  const handleResetGame = () => {
    if (
      window.confirm(
        "¿Estas seguro que deseas REINICIAR el juego completamente? Se borrará todo el progreso de la y los equipos"
      )
    ) {
      dispatch(resetGame());
      alert(
        "Juego reiniciado con éxito. ¡Los datos guardados han sido borrados!"
      );
    }
  };

  const handleResetScore = () => {
    if (
      window.confirm(
        "¿Estas seguro que deseas REINICIAR la partida? Se borrará todo el progreso "
      )
    ) {
      dispatch(resetScores());
      alert("Partida reiniciada con éxito.");
    }
  };
  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-white/80">
            Gestiona las preguntas y equipos del juego
          </p>
          <div className="flex py-2 gap-2 justify-end">
            <button
              onClick={handleResetGame}
              className="rounded p-2 bg-sky-600 focus:outline-none focus:ring-2 hover:bg-red-600 text-white font-bold"
            >
              ⚠️ REINICIO
            </button>

            <button
              className="rounded p-2 bg-sky-600 hover:bg-amber-600 text-white font-bold"
              onClick={handleResetScore}
            >
              🔄 Reiniciar Partida
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-white/20">
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "questions"
                ? "text-white border-b-2 border-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Preguntas
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "teams"
                ? "text-white border-b-2 border-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Equipos
          </button>
        </div>

        {/* Contenido de Preguntas */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Gestión de Preguntas
              </h2>
              <button
                onClick={handleOpenAddModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                + Nueva Pregunta
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="mb-4">
                <p className="text-white/90 text-sm">
                  Arrastra las preguntas para reordenarlas. Haz clic en "Editar"
                  para modificar una pregunta o "Eliminar" para eliminarla.
                </p>
              </div>
              <QuestionsList onEditQuestion={handleEditQuestion} />
            </div>
          </div>
        )}

        {/* Contenido de Equipos */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Gestión de Equipos
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TeamsPanel />
            </div>
          </div>
        )}

        {/* Modal para agregar pregunta */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          title="Crear Nueva Pregunta"
        >
          <AddQuestion onSuccess={handleAddSuccess} />
        </Modal>

        {/* Modal para editar pregunta */}
        {editingQuestion && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            title="Editar Pregunta"
          >
            <EditQuestion
              question={editingQuestion}
              onSuccess={handleEditSuccess}
            />
          </Modal>
        )}
      </div>
    </Layout>
  );
};
