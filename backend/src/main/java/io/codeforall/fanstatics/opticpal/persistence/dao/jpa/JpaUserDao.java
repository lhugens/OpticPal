package io.codeforall.fanstatics.opticpal.persistence.dao.jpa;

import io.codeforall.fanstatics.opticpal.persistence.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class JpaUserDao extends GenericJpaDao<User>{

    public JpaUserDao(){
        super(User.class);
    }

    public boolean existsByEmail(String email) {
        try {
            Long count = em.createQuery(
                            "SELECT COUNT(u) FROM opticpal_users u WHERE u.email = :email", Long.class)
                    .setParameter("email", email)
                    .getSingleResult();
            return count > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
