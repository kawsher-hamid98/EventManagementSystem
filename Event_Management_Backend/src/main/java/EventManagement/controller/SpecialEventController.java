package EventManagement.controller;


import EventManagement.model.SpecialEvent;
import EventManagement.model.User;
import EventManagement.model.saveEvent;
import EventManagement.repository.SpecialEventRepository;
import EventManagement.repository.UserEventRepository;
import EventManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/specialEvent")
public class SpecialEventController {

    @Autowired private SpecialEventRepository specialEventRepository;
    @Autowired private UserEventRepository userEventRepository;
    @Autowired private UserRepository userRepository;

    @GetMapping("/getAll")
//    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public List<SpecialEvent> getAllSpecialEvent() {
        return specialEventRepository.findAll();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deleteSpecialEvent(@PathVariable("id") String id) {
        specialEventRepository.deleteSpecialEventById(id);
        return new ResponseEntity<>("Event has been deleted!", HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
//    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public SpecialEvent getSpecialEvent(@PathVariable("id") String id) {
        return specialEventRepository.findSpecialEventById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> saveSpecialEvent(@RequestBody SpecialEvent specialEvent) {
        specialEventRepository.save(specialEvent);
        System.out.println("Special Event was called");
        return ResponseEntity.status(HttpStatus.OK).body("Event Saved");
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public SpecialEvent updateSpecialEvent(@RequestBody SpecialEvent specialEvent) {
        return specialEventRepository.save(specialEvent);
    }

    @PostMapping("/customerEvent/{username}/{id}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<saveEvent> saveEventUser(@PathVariable("username") String username, @PathVariable("id") String id) {

        SpecialEvent specialEvent = specialEventRepository.findSpecialEventById(id);
        User user = userRepository.findUserByUsername(username);

            saveEvent saveEvent = new saveEvent();
            saveEvent.setEventId(specialEvent.getId());
            saveEvent.setUsername(user.getUsername());

            return new ResponseEntity<>(userEventRepository.save(saveEvent), HttpStatus.OK);

            //{ "eventId": String('5bfea475ec88791f4cb54c7f') }

        }
    }
