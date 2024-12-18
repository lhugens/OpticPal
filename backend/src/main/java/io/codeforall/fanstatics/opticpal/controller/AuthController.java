package io.codeforall.fanstatics.opticpal.controller;

import io.codeforall.fanstatics.opticpal.persistence.model.User;
import io.codeforall.fanstatics.opticpal.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public void setAuthService(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<String> signUp(@Valid @RequestBody User user, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("Invalid");
        }
        if (authService.isUserAlreadySignedUp(user.getEmail())) {
            return ResponseEntity.ok("User is already in the database");
        }
        try {
            authService.signup(user);
            return ResponseEntity.ok("User signed up successfully!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("User is already in the database");
        }
    }
}
