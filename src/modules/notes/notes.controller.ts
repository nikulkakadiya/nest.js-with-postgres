import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
  constructor(private _notesService: NotesService) {}

  @Get('getAllNotes')
  @UseGuards(AuthGuard('jwt'))
  async getAllNotes(@Request() req) {
    console.log('req--', req.user.id);
    return await this._notesService.getAllNotes(req.user.id);
  }

  @Post('noteAdd')
  @UseGuards(AuthGuard('jwt'))
  async addNote(@Request() req, @Body() body) {
    body.userId = req.user.id;
    return await this._notesService.addNote(body);
  }

  @Put('noteUpdate/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateNote(@Body() body, @Param('id') noteId: string) {
    try {
      return await this._notesService.updateNote(noteId, body);
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: 'An error occurred while updating note',
      };
    }
  }

  @Delete('noteDelete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteNote(@Param('id') noteId: string) {
    try {
      return await this._notesService.deleteNote(noteId);
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: 'An error occurred while deleting note',
      };
    }
  }
}
