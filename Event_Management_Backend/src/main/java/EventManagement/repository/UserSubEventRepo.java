package EventManagement.repository;

import EventManagement.model.UserSubEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSubEventRepo extends MongoRepository<UserSubEvent, String>{
    UserSubEvent findUserSubEventById(String id);
}
