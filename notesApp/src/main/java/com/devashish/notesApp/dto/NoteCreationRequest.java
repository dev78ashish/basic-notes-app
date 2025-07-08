package com.devashish.notesApp.dto;

import lombok.Data;

@Data
public class NoteCreationRequest {
    private String title;
    private String description;
    private String imageUrl;
    private String imagePublicId;
}