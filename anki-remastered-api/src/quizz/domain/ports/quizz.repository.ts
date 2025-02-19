import {Card} from "../../../cards/domain/card.entity";

export interface QuizzRepository {
    getQuizzForUser(userId: string, quizzDate: Date): Card[] | undefined;

    saveQuizzForUser(userId: string, quizzDate: Date, quizzData: Card[]): void;

    getCardByIdAndQuizzDateForUser(userId: string, quizzDate: Date, cardId: string): Card | undefined;
}