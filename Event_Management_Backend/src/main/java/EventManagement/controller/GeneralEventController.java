package EventManagement.controller;


import EventManagement.model.GeneralEvent;
import EventManagement.repository.GeneralEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/generalEvent")
public class GeneralEventController {

    @Autowired private GeneralEventRepository generalEventRepository;

    @GetMapping
    public List<GeneralEvent> getAllGeneralEvents() {
        return generalEventRepository.findAll();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") String id) {
        generalEventRepository.deleteGeneralEventById(id);
        return new ResponseEntity<>("Event has been deleted!", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public GeneralEvent getEvent(@PathVariable("id") String id) {
        return generalEventRepository.findGeneralEventById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public GeneralEvent saveEvent(@RequestBody GeneralEvent generalEvent) {
        return generalEventRepository.save(generalEvent);
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public GeneralEvent updateEvent(@RequestBody GeneralEvent generalEvent) {
        return generalEventRepository.save(generalEvent);
    }
}
