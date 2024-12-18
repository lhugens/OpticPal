package io.codeforall.fanstatics.opticpal.persistence.dao.jpa;

import io.codeforall.fanstatics.opticpal.persistence.model.User;

public class JpaUserDao extends GenericJpaDao<User>{

    public JpaUserDao(){
        super(User.class);
    }
}
