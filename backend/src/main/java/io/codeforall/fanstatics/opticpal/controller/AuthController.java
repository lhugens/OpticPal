package io.codeforall.fanstatics.opticpal.controller;

import io.codeforall.fanstatics.opticpal.persistence.model.User;
import io.codeforall.fanstatics.opticpal.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    public ResponseEntity<String> signUp(@RequestBody User user){
        try {
            authService.signup(user);
            return ResponseEntity.ok("User signed up successfully!");
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
