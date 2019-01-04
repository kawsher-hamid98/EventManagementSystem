package EventManagement.repository;

import EventManagement.model.saveEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserEventRepository extends MongoRepository<saveEvent, String> {

}
