package com.devashish.notesApp.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;
    private String email;
    private String password;

    @CreatedDate
    private Instant createdAt;
}
