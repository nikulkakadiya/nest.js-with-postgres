import { Injectable } from '@nestjs/common';
import { Notes } from '../../entities/dbdemo'
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class NotesService {
    constructor(){
        
    }
    
    async getAllNotes(){
        const data = await Notes.findAll();
        return {
            status: 'success',
            data,
            message: 'Successfully',
        };
    }

    async addNote(payload: any) {
        try{            
            const note = await Notes.create({
                noteId: uuidv1(),
                title: payload.title,
                description: payload.description,
                tag: payload.tag,
                userId: payload.userId,
            });
            return {
                status: 'success',
                note,
                message: 'User Created Successfully',
            };
        }catch(error){
            console.log(error);
            return { status: 'error', message: 'An error occurred while adding note' };         
        }
    }

    async updateNote(noteId: string, payload: any) {
        try {
            const findNote = await Notes.findOne({
                where: { noteId } // Ensure the note belongs to the requesting user
            });
    
            if (!findNote) {
                return { status: 'error', message: 'Note not found' };
            }

            const note = await Notes.update(
                {
                    // Update the fields with the new values from the payload
                    title: payload.title,
                    description: payload.description,
                    tag: payload.tag,
                    userId: payload.userId
                },
                {
                    where: { noteId: noteId } // Find the note by its ID
                }
            );
    
            if (!note) {
                return { status: 'error', message: 'Note not found' };
            }
    
            return {
                status: 'success',
                note,
                message: 'Note updated successfully',
            };
        } catch (error) {
            console.log(error);
            return { status: 'error', message: 'An error occurred while updating note' };
        }
    }

    async deleteNote(noteId: string) {
        try {
            const note = await Notes.findOne({
                where: { noteId} // Find the note by its ID
            });
    
            if (!note) {
                return { status: 'error', message: 'Note not found' };
            }
    
             // Delete the note from the database
            await Notes.destroy({where: { noteId}})
            return {
                status: 'success',
                message: 'Note deleted successfully',
            };
        } catch (error) {
            console.log(error);
            return { status: 'error', message: 'An error occurred while deleting note' };
        }
    }
}
