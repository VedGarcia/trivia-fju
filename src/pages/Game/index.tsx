import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { AddTeam } from "../../components/AddTeam";
import { TeamList } from "../../components/TeamList";
import { ScoreBoard } from "../../components/ScoreBoard";
import { TeamSelector } from "../../components/TeamSelector";
import { CorrectAnswerAnimation } from "../../components/CorrectAnswerAnimation";
import { getTeamColorByIndex } from "../../utils/teamColors";
import {
  startGame,
  nextQuestion,
  updateScore,
  resetScores,
  selectTeam,
} from "../../features/game/gameSlice";
import type { RootState } from "../../store";

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);
  const game = useSelector((state: RootState) => state.game);

  const { currentQuestionIndex, teams, currentQuestion, status, activeTeamId } =
    game;

  // Estado para rastrear las selecciones de cada equipo (persistente hasta siguiente pregunta)
  const [teamSelections, setTeamSelections] = useState<
    Record<string, number | null>
  >({});

  // Estado para rastrear resultados después de confirmar todas las respuestas
  const [questionResults, setQuestionResults] = useState<Record<
    string,
    { isCorrect: boolean; points: number }
  > | null>(null);

  // Estado para mostrar animación
  const [showAnimation, setShowAnimation] = useState(false);

  // Estado para mostrar resultados
  const [showResults, setShowResults] = useState(false);

  // Inicializar selecciones cuando cambia la pregunta (solo cuando cambia currentQuestionIndex)
  useEffect(() => {
    if (currentQuestion && teams.length > 0) {
      // Solo reiniciar selecciones cuando cambia la pregunta, preservar las selecciones actuales
      setTeamSelections((prev) => {
        // Si es una nueva pregunta, reiniciar todas las selecciones
        const newSelections: Record<string, number | null> = {};
        teams.forEach((team) => {
          newSelections[team.id] = null;
        });
        return newSelections;
      });
      setQuestionResults(null);
      setShowResults(false);
      setShowAnimation(false);

      // Seleccionar primer equipo por defecto solo si no hay equipo activo
      if (teams.length > 0 && !activeTeamId) {
        dispatch(selectTeam(teams[0].id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]); // Solo ejecutar cuando cambia la pregunta, NO cuando cambia el equipo activo

  // Asegurar que cuando se agregan equipos nuevos, se inicialicen sus selecciones
  // Pero NO reiniciar las selecciones existentes cuando cambia el equipo activo
  useEffect(() => {
    if (teams.length > 0 && currentQuestion && status === "playing") {
      setTeamSelections((prev) => {
        const updated = { ...prev };
        let hasChanges = false;

        teams.forEach((team) => {
          if (!(team.id in updated)) {
            updated[team.id] = null;
            hasChanges = true;
          }
        });

        // Remover equipos que ya no existen
        Object.keys(updated).forEach((teamId) => {
          if (!teams.some((t) => t.id === teamId)) {
            delete updated[teamId];
            hasChanges = true;
          }
        });

        // Solo actualizar si hay cambios para evitar re-renders innecesarios
        return hasChanges ? updated : prev;
      });
    }
  }, [teams, currentQuestion, status]);

  const handleSelectTeam = (teamId: string) => {
    dispatch(selectTeam(teamId));
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!activeTeamId) return;

    // Guardar la selección para el equipo activo
    // Usar función de actualización para asegurar que tenemos el estado más reciente
    setTeamSelections((prev) => {
      // Crear un nuevo objeto para asegurar la inmutabilidad
      const updated = { ...prev };
      updated[activeTeamId] = optionIndex;
      return updated;
    });
  };

  const handleConfirmAllAnswers = () => {
    if (!currentQuestion) return;

    const results: Record<string, { isCorrect: boolean; points: number }> = {};
    const correctAnswerIndex = currentQuestion.answerOptions.findIndex(
      (option) => option.isCorrect
    );

    // Procesar respuestas de todos los equipos
    teams.forEach((team) => {
      const selectedIndex = teamSelections[team.id];
      if (selectedIndex !== null && selectedIndex !== undefined) {
        const isCorrect = selectedIndex === correctAnswerIndex;
        const points = isCorrect ? 10 : 0;

        // Actualizar puntaje en Redux
        dispatch(
          updateScore({
            teamId: team.id,
            points,
            isCorrect,
          })
        );

        results[team.id] = { isCorrect, points };
      }
    });

    setQuestionResults(results);
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setShowResults(true);
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  const handleStartGame = () => {
    if (questions.length > 0 && teams.length > 0) {
      dispatch(startGame(questions));
    }
  };

  const handleResetScores = () => {
    dispatch(resetScores());
  };

  // Verificar si todos los equipos han seleccionado una respuesta
  const allTeamsSelected =
    teams.length > 0 &&
    teams.every(
      (team) =>
        teamSelections[team.id] !== null &&
        teamSelections[team.id] !== undefined
    );

  // Obtener selección del equipo activo
  const activeTeamSelection = activeTeamId
    ? teamSelections[activeTeamId] ?? null
    : null;

  // Función para obtener qué equipos seleccionaron una opción específica
  const getTeamsForOption = (optionIndex: number) => {
    return teams.filter((team) => teamSelections[team.id] === optionIndex);
  };

  // Pantalla de inicio: agregar equipos
  if (status === "idle") {
    return (
      <Layout>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Configuración del Juego
            </h1>
            <p className="text-white/90 text-lg">
              Agrega y gestiona los equipos para comenzar
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Agregar Equipo
            </h2>
            <AddTeam />
          </div>

          <div className="mb-6">
            <TeamList teams={teams} />
          </div>

          <div className="mb-6">
            <ScoreBoard teams={teams} />
          </div>

          {teams.length > 0 && questions.length > 0 && (
            <div className="text-center">
              <button
                onClick={handleStartGame}
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-bold text-lg"
              >
                Iniciar Juego
              </button>
            </div>
          )}

          {questions.length === 0 && (
            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-center">
              <p className="text-white font-medium">
                No hay preguntas disponibles. Ve a la página de administración
                para agregar preguntas.
              </p>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Pantalla de juego
  if (status === "playing" && currentQuestion) {
    const correctAnswerIndex = currentQuestion.answerOptions.findIndex(
      (option) => option.isCorrect
    );

    return (
      <Layout>
        <div className="h-screen flex flex-col">
          {/* Animación de respuesta correcta */}
          {showAnimation && (
            <CorrectAnswerAnimation
              question={currentQuestion}
              onAnimationComplete={handleAnimationComplete}
            />
          )}

          {/* Pantalla de resultados */}
          {showResults && questionResults && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/10 backdrop-blur-md p-4">
              <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Resultados de la Pregunta
                </h2>

                {/* Mostrar equipos ganadores destacados */}
                {Object.values(questionResults).some((r) => r.isCorrect) && (
                  <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-2">
                      🏆 Equipos Ganadores:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {teams
                        .filter((team) => questionResults[team.id]?.isCorrect)
                        .map((team, index) => {
                          const color = getTeamColorByIndex(
                            teams.findIndex((t) => t.id === team.id)
                          );
                          return (
                            <div
                              key={team.id}
                              className="px-3 py-1 rounded-full text-sm font-bold text-white"
                              style={{ backgroundColor: color.primary }}
                            >
                              {team.name} (+10 pts)
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  {teams.map((team, teamIndex) => {
                    const result = questionResults[team.id];
                    if (!result) return null;
                    const color = getTeamColorByIndex(teamIndex);

                    return (
                      <div
                        key={team.id}
                        className={`flex justify-between items-center p-4 rounded-md border-2 ${
                          result.isCorrect
                            ? "bg-green-50 border-green-500"
                            : "bg-red-50 border-red-500"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color.primary }}
                          />
                          <span className="font-medium text-gray-800">
                            {team.name}
                          </span>
                        </div>
                        <span
                          className={`font-bold text-lg ${
                            result.isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {result.isCorrect
                            ? `✓ +${result.points} pts`
                            : "✗ 0 pts"}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-bold text-lg"
                  >
                    {currentQuestionIndex + 1 < questions.length
                      ? "Siguiente Pregunta"
                      : "Ver Resultados Finales"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Header fijo */}
          <div className="flex-shrink-0 p-4 bg-gradient-to-r from-purple-400 to-sky-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-white font-bold text-lg">
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-white font-bold text-lg">
                  {teams.filter((t) => teamSelections[t.id] !== null).length} /{" "}
                  {teams.length} equipos seleccionaron
                </p>
              </div>
            </div>
          </div>

          {/* Contenido principal con layout de 2 columnas */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Columna izquierda: Pregunta y selección */}
              <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto">
                {/* Selector de equipos */}
                <div className="flex-shrink-0">
                  <TeamSelector
                    teams={teams}
                    selectedTeamId={activeTeamId}
                    onSelectTeam={handleSelectTeam}
                  />
                </div>

                {/* Pregunta y opciones de respuesta */}
                <div className="flex-1 bg-white rounded-lg shadow-lg p-6 flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex-shrink-0">
                    {currentQuestion.text}
                  </h2>

                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {currentQuestion.answerOptions.map((option, index) => {
                      const isSelectedByActiveTeam =
                        activeTeamSelection === index;
                      const teamsForThisOption = getTeamsForOption(index);
                      const isCorrectOption = index === correctAnswerIndex;
                      const activeTeamIndex = teams.findIndex(
                        (t) => t.id === activeTeamId
                      );

                      return (
                        <div
                          key={index}
                          className={`relative rounded-md border-2 transition-all ${
                            isSelectedByActiveTeam
                              ? "border-blue-500 ring-2 ring-blue-300"
                              : teamsForThisOption.length > 0
                              ? "border-gray-300"
                              : "border-gray-300"
                          } ${
                            isCorrectOption && showResults
                              ? "border-green-500 bg-green-50"
                              : "bg-white"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleOptionSelect(index)}
                            disabled={showResults}
                            className={`w-full text-left p-4 rounded-md transition-all ${
                              isSelectedByActiveTeam
                                ? "bg-blue-50"
                                : "hover:bg-gray-50"
                            } ${
                              showResults ? "cursor-default" : "cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    isSelectedByActiveTeam
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-gray-400"
                                  }`}
                                >
                                  {isSelectedByActiveTeam && (
                                    <div className="w-3 h-3 rounded-full bg-white" />
                                  )}
                                </div>
                                <span className="text-gray-800 font-medium">
                                  {option.text}
                                </span>
                                {isCorrectOption && showResults && (
                                  <span className="ml-2 text-green-600 font-bold">
                                    ✓ Correcta
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>

                          {/* Mostrar equipos que seleccionaron esta opción */}
                          {teamsForThisOption.length > 0 && (
                            <div className="px-4 pb-3 pt-1 border-t border-gray-200 bg-gray-50 rounded-b-md">
                              <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-xs text-gray-600 font-medium mr-2">
                                  Seleccionado por:
                                </span>
                                {teamsForThisOption.map((team) => {
                                  const teamIndex = teams.findIndex(
                                    (t) => t.id === team.id
                                  );
                                  const color = getTeamColorByIndex(teamIndex);
                                  const isWinner =
                                    showResults &&
                                    questionResults?.[team.id]?.isCorrect;

                                  return (
                                    <div
                                      key={team.id}
                                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                        isWinner ? "ring-2 ring-green-500" : ""
                                      }`}
                                      style={{
                                        backgroundColor: color.bg,
                                        border: `1px solid ${color.primary}`,
                                        color: color.text,
                                      }}
                                    >
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                          backgroundColor: color.primary,
                                        }}
                                      />
                                      <span>{team.name}</span>
                                      {isWinner && (
                                        <span className="text-green-600 font-bold">
                                          ✓
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Mensaje cuando el equipo activo no ha seleccionado */}
                  {activeTeamId && activeTeamSelection === null && (
                    <div className="flex-shrink-0 mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-md">
                      <p className="text-yellow-800 text-sm text-center">
                        Selecciona una opción para el equipo activo
                      </p>
                    </div>
                  )}
                </div>

                {/* Botón de confirmar todas las respuestas */}
                {allTeamsSelected && !showResults && (
                  <div className="flex-shrink-0">
                    <button
                      onClick={handleConfirmAllAnswers}
                      className="w-full bg-green-600 text-white py-4 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-bold text-lg shadow-lg"
                    >
                      Confirmar Todas las Respuestas
                    </button>
                  </div>
                )}
              </div>

              {/* Columna derecha: ScoreBoard */}
              <div className="lg:col-span-1 flex-shrink-0">
                <div className="sticky top-4 space-y-4">
                  <ScoreBoard teams={teams} />

                  {/* Indicador de estado de equipos */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-white font-bold text-lg mb-3">
                      Estado de Equipos
                    </h3>
                    <div className="space-y-2">
                      {teams.map((team, index) => {
                        const hasSelection = teamSelections[team.id] !== null;
                        const isActive = activeTeamId === team.id;
                        const color = getTeamColorByIndex(index);

                        return (
                          <div
                            key={team.id}
                            className={`flex items-center justify-between p-2 rounded-md ${
                              isActive ? "bg-white/30" : "bg-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: color.primary }}
                              />
                              <span className="text-white text-sm font-medium">
                                {team.name}
                              </span>
                            </div>
                            {hasSelection ? (
                              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                                ✓
                              </span>
                            ) : (
                              <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                                -
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Pantalla de fin de juego
  if (status === "finished") {
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    const winner = sortedTeams[0];

    return (
      <Layout>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              ¡Juego Terminado!
            </h1>
            {winner && (
              <p className="text-2xl text-yellow-300 font-bold mb-2">
                🏆 Ganador: {winner.name} 🏆
              </p>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Puntuación Final
            </h2>
            <div className="space-y-3">
              {sortedTeams.map((team, index) => {
                const color = getTeamColorByIndex(
                  teams.findIndex((t) => t.id === team.id)
                );
                return (
                  <div
                    key={team.id}
                    className={`flex justify-between items-center rounded-md p-4 ${
                      index === 0
                        ? "bg-yellow-500/30 border-2 border-yellow-400"
                        : "bg-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color.primary }}
                      />
                      <span className="text-white font-bold text-xl">
                        #{index + 1}
                      </span>
                      <span className="text-white font-medium text-lg">
                        {team.name}
                      </span>
                    </div>
                    <span className="text-white font-bold text-xl">
                      {team.score} pts
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleResetScores}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-bold text-lg"
            >
              Nuevo Juego
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-bold text-lg"
            >
              Ir a Administración
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};
