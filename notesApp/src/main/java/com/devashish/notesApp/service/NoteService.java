package com.devashish.notesApp.service;

import com.devashish.notesApp.entity.Note;
import com.devashish.notesApp.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getNotesOfUser(String userId){
        return noteRepository.findByUserId(userId);
    }

    public Note createSingleNote(Note note){
        return noteRepository.save(note);
    }

}
