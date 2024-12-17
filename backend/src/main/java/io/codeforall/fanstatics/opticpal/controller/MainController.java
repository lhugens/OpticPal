package io.codeforall.fanstatics.opticpal.controller;

import io.codeforall.fanstatics.opticpal.persistance.model.User;
import io.codeforall.fanstatics.opticpal.controller.services.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class MainController {

    private QueueService queueService;

    @Autowired
    public void setQueueService(QueueService queueService) {
        this.queueService = queueService;
    }

    @RequestMapping(method = RequestMethod.POST, path = {"/signup"})
    public ResponseEntity<Void> signUp(@RequestBody User user){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = {"/login"})
    public ResponseEntity<Void> login(@RequestBody User user){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = {"/inneed/start"})
    public ResponseEntity<Void> inNeedStart(@RequestBody User user){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path  = {"/volunteer/start"})
    public ResponseEntity<Void> volunteerStart(@RequestBody User user){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = {"/{userId}"})
    public ResponseEntity<Void> removeUser(@RequestParam Integer userId){

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, path= {"/", ""})
    public ResponseEntity<User> match(@RequestBody User user){

        queueService.addUser(user);

        User pal = queueService.canMatch(user);

        if(pal != null){
            return new ResponseEntity<>(pal, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
