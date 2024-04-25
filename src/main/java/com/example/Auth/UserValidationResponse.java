package com.example.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserValidationResponse {
    private Long id;
    private String username;
}
