export interface AnswerOption {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    text: string;
    answerOptions: AnswerOption[];
}

export interface Team {
    id: string;
    name: string;
    score: number;
    questionsAnswered: number;
    isCorrect: boolean;
    isFinished: boolean;
    isError: boolean;
}

export interface GameState {

status: 'idle' | 'playing' | 'finished' | 'error';
questions: Question[];
teams: Team[];
currentQuestionIndex: number;
currentQuestion: Question | null;
answerOptions: AnswerOption[];
activeTeamId: string | null;
activeAnswerOptionId: string | null;

}
