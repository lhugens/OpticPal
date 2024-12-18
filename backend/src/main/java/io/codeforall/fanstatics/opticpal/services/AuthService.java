package io.codeforall.fanstatics.opticpal.services;

import io.codeforall.fanstatics.opticpal.persistence.dao.jpa.JpaUserDao;
import io.codeforall.fanstatics.opticpal.persistence.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private JpaUserDao jpaUserDao;

    @Autowired
    public void setUserRepository(JpaUserDao jpaUserDao) {
        this.jpaUserDao = jpaUserDao;
    }

    @Transactional
    public User signup(User user){

        return jpaUserDao.saveOrUpdate(user);
    }

    public boolean isUserAlreadySignedUp(String email) {
        return jpaUserDao.existsByEmail(email);
    }

    public boolean checkEmailAndPassword(String email, String password){
        return jpaUserDao.existsByEmailAndPassword(email, password);
    }

    public User getUser(String email){
        return jpaUserDao.findByEmail(email);
    }

}
