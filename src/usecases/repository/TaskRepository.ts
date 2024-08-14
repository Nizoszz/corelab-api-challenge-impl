import Note from "./Task";

export default interface TaskRepository {
    save(note: Note): Promise<void>;
    getById(noteId: string): Promise<Note | undefined>;
    getAll(): Promise<Note[]>;
    update(note: Note): Promise<void>;
    delete(noteId: string): Promise<void>;
}