package io.codeforall.fanstatics.opticpal.services;

import io.codeforall.fanstatics.opticpal.command.UserDto;
import io.codeforall.fanstatics.opticpal.persistence.model.UserType;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service
public class QueueService {

    private Queue<UserDto> inNeedQueue = new LinkedList<>();

    private Queue<UserDto> volunteersQueue = new LinkedList<>();

    public boolean addUser(UserDto userDto){
        if(userDto.getUserType() == UserType.IN_NEED && !inNeedQueue.contains(userDto)){
            inNeedQueue.add(userDto);
            return true;
        }
        if(userDto.getUserType() == UserType.VOLUNTEER && !volunteersQueue.contains(userDto)){
            volunteersQueue.add(userDto);
            return true;
        }
        return false;
    }

    public boolean removeUser(UserDto userDto){
        if(userDto.getUserType() == UserType.IN_NEED){
            inNeedQueue.remove(userDto);
            return true;
        }
        if(userDto.getUserType() == UserType.VOLUNTEER){
            volunteersQueue.remove(userDto);
            return true;
        }
        return false;
    }

    public UserDto canMatch(UserDto userDto){
        if(userDto.getUserType() == UserType.IN_NEED && !volunteersQueue.isEmpty()){
            return volunteersQueue.poll();
        }
        if(userDto.getUserType() == UserType.VOLUNTEER && !inNeedQueue.isEmpty()){
            return inNeedQueue.poll();
        }
        return null;
    }

}
