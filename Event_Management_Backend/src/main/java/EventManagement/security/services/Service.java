//package EventManagement.security.services;
//
//import EventManagement.model.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.core.io.FileSystemResource;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//
//import javax.mail.MessagingException;
//import javax.mail.internet.MimeMessage;
//
//@org.springframework.stereotype.Service(value = "service")
//public class Service {
////    @Autowired
////    JavaMailSender javaMailSender;
////
////
////
////    public void sendMail(User user) throws MessagingException {
////        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
////        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
////        helper.setFrom("basharkhan71@gmail.com");
////        helper.setTo(user.getEmail());
////        helper.setSubject("Event Management");
////        helper.setText("Here is your attachment.");
////
////        FileSystemResource file = new FileSystemResource("D:\\ticket.pdf");
////        helper.addAttachment(file.getFilename(), file);
////
////        javaMailSender.send(mimeMessage);
////    }
//
//}
