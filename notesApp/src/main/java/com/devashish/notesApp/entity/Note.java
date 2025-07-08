package com.devashish.notesApp.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "notes")
public class Note {

    @Id
    private String id;

    private String title;
    private String description;
    private String imageUrl;

    private String userId;

    @CreatedDate
    private Instant createdAt;

    private Instant updatedAt;
}
