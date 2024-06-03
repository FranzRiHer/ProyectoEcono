package com.example.controller;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.Auth.AuthResponse;
import com.example.Auth.LoginRequest;
import com.example.Auth.RegisterRequest;
import com.example.Auth.UserValidationRequest;
import com.example.Auth.UserValidationResponse;
import com.example.entities.Usuario;
import com.example.repository.UserRepository;
import com.example.service.AuthService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    
    private final AuthService authService;
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/validate")
    public ResponseEntity<UserValidationResponse> validateUser(@RequestBody UserValidationRequest request) {
        Optional<Usuario> user = userRepository.findByUsernameAndEmail(request.getUsername(), request.getEmail());
        if (user.isPresent()) {
            UserValidationResponse response = new UserValidationResponse(user.get().getId(), user.get().getUsername());
            return ResponseEntity.ok(response);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
    @PostMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Usuario request) {
        // Implementa la lógica para actualizar la contraseña aquí
        Usuario user = userRepository.findById(request.getId()).orElseThrow(() -> 
            new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
            user.setPassword(passwordEncoder.encode(request.getPassword())); // Considera el uso de un encoder para la contraseña
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    
}

