package com.devashish.notesApp.controllers;

import com.devashish.notesApp.dto.NoteCreationRequest;
import com.devashish.notesApp.entity.Note;
import com.devashish.notesApp.entity.User;
import com.devashish.notesApp.service.NoteService;
import com.devashish.notesApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private UserService userService;

    @GetMapping("/get-notes")
    public ResponseEntity<?> getNotes() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User is not authenticated");
            }

            String username = authentication.getName(); // Comes from JWT

            User user = userService.getUser(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String userId = user.getId();

            List<Note> notes = noteService.getNotesOfUser(userId);

            return ResponseEntity.ok(notes);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong. Please try again later.");
        }
    }


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
