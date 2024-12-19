package io.codeforall.fanstatics.opticpal.controller;

import io.codeforall.fanstatics.opticpal.persistence.model.LoginRequest;
import io.codeforall.fanstatics.opticpal.persistence.model.User;
import io.codeforall.fanstatics.opticpal.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public void setAuthService(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Message> signUp(@Valid @RequestBody User user, BindingResult bindingResult) {
        System.out.println(user);
       /* if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new Message("Invalid"));
        }
        if (authService.isUserAlreadySignedUp(user.getEmail())) {
            return ResponseEntity.ok(new Message("User is already in the database"));
        }*/
        try {
            authService.signup(user);
            return ResponseEntity.ok(new Message("User signed up succefully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Message("User is already in the database"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> logIn(@Valid @RequestBody LoginRequest loginRequest) {

        User user = authService.getUser(loginRequest.getEmail());
        if(user.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

}
