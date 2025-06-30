package com.ecommerce.user_management.service;

import com.ecommerce.user_management.domain.CustomUserDetails;
import com.ecommerce.user_management.domain.User;
import com.ecommerce.user_management.dto.AuthResponse;
import com.ecommerce.user_management.dto.LoginRequest;
import com.ecommerce.user_management.dto.RegisterRequest;
import com.ecommerce.user_management.exceptions.EmailAlreadyExistsException;
import com.ecommerce.user_management.repository.UserRepository;
import com.ecommerce.user_management.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository repo, PasswordEncoder encoder, JwtService jwt, AuthenticationManager authMgr) {
        this.userRepository = repo;
        this.passwordEncoder = encoder;
        this.jwtService = jwt;
        this.authenticationManager = authMgr;
    }

    public ResponseEntity<AuthResponse> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException("Email already in use");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setFirstname(request.firstname());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid email or password");
        }

        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new AuthResponse(jwtService.generateToken(new CustomUserDetails(user)));
    }
}

