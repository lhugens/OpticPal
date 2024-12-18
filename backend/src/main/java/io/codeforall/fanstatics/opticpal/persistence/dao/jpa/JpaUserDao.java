package io.codeforall.fanstatics.opticpal.persistence.dao.jpa;

import io.codeforall.fanstatics.opticpal.persistence.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class JpaUserDao extends GenericJpaDao<User>{

    public JpaUserDao(){
        super(User.class);
    }
}
