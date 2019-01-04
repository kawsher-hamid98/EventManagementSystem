package EventManagement.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "specialEvent")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpecialEvent {
    private String id;
    private String eventName;
    private String eventAddress;
    private String eventDescription;
    private String url;
    private String organizerName;
    private String organizerDetails;
    private String country;
    private String category;
    private String date;
    private String startTime;
    private String endTime;
    private int ticketVacancy;
    private int price;
    private List<SubEvent> subEvents;

    public SpecialEvent(String id, List<SubEvent> subEvents) {
        this.id = id;
        this.subEvents = subEvents;
    }
}
