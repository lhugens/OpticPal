package io.codeforall.fanstatics.opticpal.services;

import io.codeforall.fanstatics.opticpal.persistence.dao.jpa.JpaUserDao;
import io.codeforall.fanstatics.opticpal.persistence.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private JpaUserDao jpaUserDao;

    @Autowired
    public void setUserRepository(JpaUserDao jpaUserDao) {
        this.jpaUserDao = jpaUserDao;
    }

    public User signup(User user){

        return jpaUserDao.saveOrUpdate(user);
    }

}
