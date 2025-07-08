package com.devashish.notesApp.controllers;

import com.devashish.notesApp.dto.LoginRequest;
import com.devashish.notesApp.dto.LoginResponse;
import com.devashish.notesApp.dto.RegisterRequest;
import com.devashish.notesApp.entity.User;
import com.devashish.notesApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String hello(){
        return "Hello from Spring Boot!";
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request){
        try{
            User user = userService.register(request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e){
            return ResponseEntity.status(409).body(Collections
                    .singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest user) {
        try {
            String token = userService.login(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(new LoginResponse("Login success", user.getUsername(), token));
        } catch (UsernameNotFoundException | BadCredentialsException ex) {
            return ResponseEntity
                    .status(401)
                    .body(new LoginResponse(ex.getMessage(), user.getUsername(), null));
        } catch (Exception ex) {
            return ResponseEntity
                    .status(500)
                    .body(new LoginResponse("Something went wrong", user.getUsername(), null));
        }
    }


}
