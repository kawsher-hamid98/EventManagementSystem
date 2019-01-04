package EventManagement.repository;

import EventManagement.model.AmountFile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AmountFileRepo extends MongoRepository<AmountFile, String> {
    AmountFile findByFileName(String name);
}
