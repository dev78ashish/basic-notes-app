package com.devashish.notesApp.controllers;

import com.devashish.notesApp.dto.NoteCreationRequest;
import com.devashish.notesApp.entity.Note;
import com.devashish.notesApp.entity.User;
import com.devashish.notesApp.service.NoteService;
import com.devashish.notesApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private UserService userService;

    @PostMapping("/create-note")
    public ResponseEntity<?> createNote(@RequestBody NoteCreationRequest noteRequest) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName(); // comes from JWT

            User user = userService.getUser(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Note note = new Note();
            note.setTitle(noteRequest.getTitle());
            note.setDescription(noteRequest.getDescription());
            note.setImageUrl(noteRequest.getImageUrl());
            note.setImagePublidId(noteRequest.getImagePublicId());
            note.setUserId(user.getId());
            note.setCreatedAt(Instant.now());
            note.setUpdatedAt(Instant.now());

            Note savedNote = noteService.createSingleNote(note);

            return ResponseEntity.ok(Map.of("message", "Note creation successful"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Note creation failed"));
        }
    }


}
