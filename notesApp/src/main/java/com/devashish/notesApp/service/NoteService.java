package com.devashish.notesApp.service;

import com.devashish.notesApp.entity.Note;
import com.devashish.notesApp.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note createSingleNote(Note note){
        return noteRepository.save(note);
    }

}
