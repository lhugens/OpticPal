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
        if(userDto.getUserType().equals(UserType.IN_NEED) && !inNeedQueue.contains(userDto)){
            System.out.println("hellooooooooooooooooooooooooooooooooooo innerd");
            UserDto userDto1 = new UserDto();
            userDto1.setUserType(UserType.VOLUNTEER);
            userDto1.setPhone("627338263");
            userDto1.setFirstName("Leonardo");
            userDto1.setLastName("Hugens");
            volunteersQueue.add(userDto1);
            inNeedQueue.add(userDto);
            return true;
        }
        if(userDto.getUserType().equals(UserType.VOLUNTEER) && !volunteersQueue.contains(userDto)){
            System.out.println("hellooooooooooooooooooooooooooooooooooo volunt");
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
        System.out.println("inneed: " + inNeedQueue.size() + " volun: " + volunteersQueue.size());
        if(userDto.getUserType().equals( UserType.IN_NEED) && !volunteersQueue.isEmpty()){
            return volunteersQueue.poll();

        }
        if(userDto.getUserType().equals(UserType.VOLUNTEER) && !inNeedQueue.isEmpty()){
            return inNeedQueue.poll();
        }
        return null;
    }

}
