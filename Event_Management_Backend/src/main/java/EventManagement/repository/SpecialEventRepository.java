package EventManagement.repository;

import EventManagement.model.SpecialEvent;
import EventManagement.model.SubEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SpecialEventRepository extends MongoRepository<SpecialEvent, String> {
    SpecialEvent findSpecialEventById(String id);
    void deleteSpecialEventById(String id);
}
