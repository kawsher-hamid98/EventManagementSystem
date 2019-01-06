package EventManagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "saveEvent")
public class saveEvent {
    private String id;
    private String eventId;
    private String username;
   // private Set<User> user = new HashSet<>();
    private Set<SpecialEvent> specialEvents = new HashSet<>();
}
