package com.devashish.notesApp.repository;

import com.devashish.notesApp.entity.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByUserId(String userId);
}
