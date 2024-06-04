package com.example.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserValidationRequest {
    private String username;
    private String email;
}
