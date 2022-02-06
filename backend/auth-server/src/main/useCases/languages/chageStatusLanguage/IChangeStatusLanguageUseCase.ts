import { Language } from "@models/Language";

export default interface IChangeStatusLanguageUseCase {
    execute(id: number, status: boolean): Promise<Language | undefined>
}