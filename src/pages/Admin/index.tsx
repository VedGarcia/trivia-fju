import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Modal } from "../../components/Modal";
import { AddQuestion } from "../../components/AddQuestion";

export const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    // Cerrar el modal después de crear la pregunta exitosamente
    handleCloseModal();
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Panel de Administración
          </h1>
          <button
            onClick={handleOpenModal}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            + Nueva Pregunta
          </button>
        </div>

        <div className="border border-white rounded-lg shadow-md p-4">
          <p className="text-white font-bold">
            Aquí puedes gestionar las preguntas del juego. Haz clic en "Nueva
            Pregunta" para agregar una nueva.
          </p>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Crear Nueva Pregunta"
        >
          <AddQuestion onSuccess={handleSuccess} />
        </Modal>
      </div>
    </Layout>
  );
};
