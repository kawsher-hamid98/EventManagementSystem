package EventManagement.controller;


import EventManagement.model.*;
import EventManagement.repository.GeneralEventRepository;
import EventManagement.repository.UserRepository;
import EventManagement.service.UserService;
import com.itextpdf.text.DocumentException;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/generalEvent")
public class GeneralEventController {

    @Autowired
    UserService userService;

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    GridFsOperations gridFsOperations;

    @Autowired
    private GeneralEventRepository generalEventRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/send-mail/{username}/{eventId}")
    public ResponseEntity<String> sendMail(@PathVariable("username") String username,
                         @PathVariable("eventId") String eventId) throws MessagingException, FileNotFoundException, DocumentException {
        System.out.println("Send Mail is called(g event)");
        User user = userRepository.findUserByUsername(username);


        GeneralEvent generalEvent = generalEventRepository.findGeneralEventById(eventId);

        userService.makePdfForFreeEvent(username, eventId);

        //----------- Ticket Vacancy---------------------
        int ticketVacancy = generalEvent.getVacancy();
        if(ticketVacancy != 0) {
            ticketVacancy--;
            generalEvent.setVacancy(ticketVacancy);
            generalEventRepository.save(generalEvent);
        }


        //-----------mail--------------------
        String dest = "F:/Pdf/";

        String fileName = user.getUsername() + "-" + generalEvent.getId() + ".pdf";

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("eventmanageteam@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Event Management");
        helper.setText("Here is your attachment");

        FileSystemResource fileSystemResource = new FileSystemResource(dest + fileName);

        //save amountFile
        DBObject dbObject = new BasicDBObject();
        dbObject.put("Organization", "SEU");

        InputStream inputStream = new FileInputStream(dest + fileName);
        gridFsOperations.store(inputStream, fileName, "pdf", dbObject);

        helper.addAttachment(fileSystemResource.getFilename(), fileSystemResource);
        javaMailSender.send(mimeMessage);

        return ResponseEntity.status(HttpStatus.OK).body("Email Sent");

    }

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
