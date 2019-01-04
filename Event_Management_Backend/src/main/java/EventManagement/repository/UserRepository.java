package EventManagement.repository;

import java.util.Optional;

import EventManagement.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    User findUserById(String id);
    User findUserByUsername(String name);
    void deleteUsersById(String id);
}