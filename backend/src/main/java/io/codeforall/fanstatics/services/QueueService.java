package io.codeforall.fanstatics.services;

import io.codeforall.fanstatics.persistance.model.User;
import io.codeforall.fanstatics.persistance.model.UserType;

import java.util.PriorityQueue;
import java.util.Queue;

public class QueueService {

    private Queue<User> inNeed = new PriorityQueue<>();

    private Queue<User> volunteers = new PriorityQueue<>();

    public void addUser(User user){
        if(user.getUser_type() == UserType.IN_NEED){
            inNeed.add(user);
        }
        if(user.getUser_type() == UserType.VOLUNTEER){
            volunteers.add(user);
        }
    }

    public User canMatch(User user){
        if(user.getUser_type() == UserType.IN_NEED && !volunteers.isEmpty()){
            return volunteers.poll();
        }
        if(user.getUser_type() == UserType.VOLUNTEER && !inNeed.isEmpty()){
            return inNeed.poll();
        }
        return null;
    }

}
