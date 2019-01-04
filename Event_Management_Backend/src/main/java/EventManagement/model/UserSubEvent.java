package EventManagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "UserSubEvent")
public class UserSubEvent {
    private String id;
    private List<String> nameList;

    public UserSubEvent(List<String> nameList) {
        this.nameList = nameList;
    }
}
