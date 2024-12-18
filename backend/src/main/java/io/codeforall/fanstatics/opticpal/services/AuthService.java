package io.codeforall.fanstatics.opticpal.services;

import io.codeforall.fanstatics.opticpal.persistence.jpa.UserRepository;
import io.codeforall.fanstatics.opticpal.persistence.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User signup(User user){

        if(userRepository.existsByEmail(user.getEmail())){
            throw new IllegalArgumentException("Email is already registered");
        }

        return userRepository.save(user);
    }

}
