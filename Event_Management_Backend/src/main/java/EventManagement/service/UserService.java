package EventManagement.service;

import EventManagement.message.request.SignUpForm;
import EventManagement.model.SubEvent;
import com.itextpdf.text.DocumentException;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.FileNotFoundException;
import java.util.List;

public interface UserService {
    boolean isConflict(List<SubEvent> subEvents);
    void createUser(SignUpForm signUpForm);
    void createAdmin(SignUpForm signUpForm);
    void makePdf(String username, String eventId, List<SubEvent> subEvents) throws FileNotFoundException, DocumentException;
    void makePdfForFreeEvent(String username, String eventId) throws DocumentException, FileNotFoundException;
}
