package io.codeforall.fanstatics.opticpal.controller;

import io.codeforall.fanstatics.opticpal.command.UserDto;
import io.codeforall.fanstatics.opticpal.services.QueueService;
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

    @RequestMapping(method = RequestMethod.POST, path  = {"/start"})
    public ResponseEntity<Void> userStart(@RequestBody UserDto userDto){

        if(queueService.addUser(userDto)){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.CONFLICT);

    }

    @RequestMapping(method = RequestMethod.DELETE, path = {"/{userId}"})
    public ResponseEntity<Void> removeUser(@RequestBody UserDto userDto){

        if(queueService.removeUser(userDto)){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @RequestMapping(method = RequestMethod.POST, path= {"/", ""})
    public ResponseEntity<UserDto> match(@RequestBody UserDto userDto){

        queueService.addUser(userDto);

        UserDto pal = queueService.canMatch(userDto);

        if(pal != null){
            return new ResponseEntity<>(pal, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
