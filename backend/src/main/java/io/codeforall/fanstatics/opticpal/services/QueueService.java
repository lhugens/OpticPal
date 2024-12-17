package io.codeforall.fanstatics.opticpal.controller.services;

import io.codeforall.fanstatics.opticpal.persistance.model.User;
import io.codeforall.fanstatics.opticpal.persistance.model.UserType;
import org.springframework.stereotype.Service;

import java.util.PriorityQueue;
import java.util.Queue;

@Service
public class QueueService {

    private Queue<User> inNeedQueue = new PriorityQueue<>();

    private Queue<User> volunteersQueue = new PriorityQueue<>();

    public boolean addUser(User user){
        if(user.getUser_type() == UserType.IN_NEED && !inNeedQueue.contains(user)){
            inNeedQueue.add(user);
            return true;
        }
        if(user.getUser_type() == UserType.VOLUNTEER && !volunteersQueue.contains(user)){
            volunteersQueue.add(user);
            return true;
        }
        return false;
    }

    public boolean removeUser(User user){
        if(user.getUser_type() == UserType.IN_NEED){
            inNeedQueue.remove(user);
            return true;
        }
        if(user.getUser_type() == UserType.VOLUNTEER){
            volunteersQueue.remove(user);
            return true;
        }
        return false;
    }

    public User canMatch(User user){
        if(user.getUser_type() == UserType.IN_NEED && !volunteersQueue.isEmpty()){
            return volunteersQueue.poll();
        }
        if(user.getUser_type() == UserType.VOLUNTEER && !inNeedQueue.isEmpty()){
            return inNeedQueue.poll();
        }
        return null;
    }

}
