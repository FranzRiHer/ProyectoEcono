package com.example.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Auth.AuthResponse;
import com.example.Auth.LoginRequest;
import com.example.Auth.RegisterRequest;
import com.example.Jwt.JwtService;
import com.example.entities.Rol;
import com.example.entities.Usuario;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final MetaService metaService;
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
            .token(token)
            .build();

    }

    public AuthResponse register(RegisterRequest request) {
        Usuario user = Usuario.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .nombre(request.getNombre())
            .email(request.getEmail())
            .rol(Rol.valueOf(request.getRol().toUpperCase()))
            .build();

        // Guarda el usuario y captura la entidad guardada para obtener el ID generado
        Usuario savedUser = userRepository.save(user);

        // Crea metas predeterminadas
        metaService.createDefaultMetasForUser(savedUser);
            

        String token = jwtService.getToken(savedUser);

        return AuthResponse.builder()
            .token(token)
            .build();
    }
}
