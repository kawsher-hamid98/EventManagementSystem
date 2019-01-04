package EventManagement;

import EventManagement.model.GeneralEvent;
import EventManagement.model.SpecialEvent;
import EventManagement.model.SubEvent;
import EventManagement.repository.GeneralEventRepository;
import EventManagement.repository.SpecialEventRepository;
import EventManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class SpringBootJwtAuthenticationApplication  {
    // https://farm5.staticflickr.com/4814/43983798100_00c9e801d5_b.jpg
    @Autowired
    private GeneralEventRepository generalEventRepository;
    @Autowired
    private SpecialEventRepository specialEventRepository;
    @Autowired
    UserRepository userRepository;
    public static void main(String[] args) {
        SpringApplication.run(SpringBootJwtAuthenticationApplication.class, args);
    }

    @Bean
    CommandLineRunner runner () {
        return args -> {
//            SpecialEvent specialEvent = specialEventRepository.findSpecialEventById("5c2606ad7650ca12546b1d32");
//            List<SubEvent> subEventList = specialEvent.getSubEvents();
//            subEventList.remove(0).getName();
        };
    }
}