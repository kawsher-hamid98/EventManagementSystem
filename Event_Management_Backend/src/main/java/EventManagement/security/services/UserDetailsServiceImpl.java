package EventManagement.security.services;

import EventManagement.message.request.SignUpForm;
import EventManagement.model.Role;
import EventManagement.model.SpecialEvent;
import EventManagement.model.SubEvent;
import EventManagement.model.User;
import EventManagement.repository.SpecialEventRepository;
import EventManagement.repository.UserRepository;
import EventManagement.service.UserService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.draw.LineSeparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserService {

	@Autowired
	SpecialEventRepository specialEventRepository;

	@Autowired
    UserRepository userRepository;

	@Autowired
	JavaMailSender javaMailSender;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));

		return UserPrinciple.build(user);
	}

	@Override
	public boolean isConflict(List<SubEvent> subEvents) {
		for(int i = 0; i < subEvents.size(); i++) {
			LocalTime targetTime = subEvents.get(i).getStartTime();
			for(int j = 0; j < subEvents.size(); j++) {
				if(i == (subEvents.size() - 1) && j == (subEvents.size() - 2)) {
					if(targetTime.isAfter(subEvents.get(j).getStartTime())
							&& targetTime.isBefore(subEvents.get(j).getEndTime())
							|| targetTime.equals(subEvents.get(j).getStartTime())) {
						return true;
					} else return false;

				}
				if(i == j) {
					j++;
				}
				if(targetTime.isAfter(subEvents.get(j).getStartTime())
						&& targetTime.isBefore(subEvents.get(j).getEndTime())
						|| targetTime.equals(subEvents.get(j).getStartTime())) {
					return true;
				}
			}

		}

		return false;
	}

	@Override
	public void createUser(SignUpForm signUpForm) {
		User user = new User();
		user.setUsername(signUpForm.getUsername());
		user.setName(signUpForm.getName());
		user.setEmail(signUpForm.getEmail());
		user.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
		Role role = new Role("USER");
		Set<Role> roleSet = new HashSet<>();
		roleSet.add(role);
		user.setRoles(roleSet);
		userRepository.save(user);
	}

	@Override
	public void createAdmin(SignUpForm signUpForm) {
		User user = new User();
		user.setUsername(signUpForm.getUsername());
		user.setName(signUpForm.getName());
		user.setEmail(signUpForm.getEmail());
		user.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
		Role role = new Role("ADMIN");
		Set<Role> roleSet = new HashSet<>();
		roleSet.add(role);
		user.setRoles(roleSet);
		userRepository.save(user);
	}

	@Override
	public void makePdf(String username, String eventId, List<SubEvent> subEventList) throws FileNotFoundException, DocumentException {
		User user = userRepository.findUserByUsername(username);
		SpecialEvent specialEvent = specialEventRepository.findSpecialEventById(eventId);

		System.out.println("User Name: " + user.getUsername());
		System.out.println("Event Name: " + specialEvent.getEventName());

		String dest = "F:/Pdf/";

		String fileName = user.getUsername() + "-" + specialEvent.getId() + ".pdf";

		com.itextpdf.text.Document document = new com.itextpdf.text.Document();
		com.itextpdf.text.pdf.PdfWriter writer = com.itextpdf.text.pdf.PdfWriter.getInstance(document, new FileOutputStream(dest + fileName));

		document.open();

		Font blue = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD, BaseColor.RED);
		Chunk blueText = new Chunk("Event Go", blue);
		Font eventName = new Font(Font.FontFamily.HELVETICA, 15, Font.BOLD, BaseColor.BLACK);
		Chunk eventNameText = new Chunk(specialEvent.getEventName(), eventName);

		com.itextpdf.text.Paragraph p1 = new com.itextpdf.text.Paragraph(blueText);
		p1.setAlignment(Element.ALIGN_CENTER);
		com.itextpdf.text.Paragraph p2 = new com.itextpdf.text.Paragraph(eventNameText);
		com.itextpdf.text.Paragraph p3 = new com.itextpdf.text.Paragraph(specialEvent.getEventAddress());
		com.itextpdf.text.Paragraph p4 = new com.itextpdf.text.Paragraph(specialEvent.getDate());
		com.itextpdf.text.Paragraph p5 = new com.itextpdf.text.Paragraph("Ticket No: " + fileName);
		com.itextpdf.text.Paragraph p6 = new com.itextpdf.text.Paragraph("Ordered By: " + user.getUsername());
		Font eventInfo = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.DARK_GRAY);
		Chunk eventInfoText = new Chunk(specialEvent.getEventDescription(), eventInfo);
		com.itextpdf.text.Paragraph p7 = new com.itextpdf.text.Paragraph(eventInfoText);

		Font yourEvent = new Font(Font.FontFamily.HELVETICA, 15, Font.BOLD, BaseColor.BLACK);
		Chunk yourEventTExt = new Chunk("Your Event", yourEvent);
		com.itextpdf.text.Paragraph p8 = new com.itextpdf.text.Paragraph(yourEventTExt);
		p8.setAlignment(Element.ALIGN_CENTER);

		p2.setSpacingBefore(10f);
		p3.setSpacingBefore(10f);
		p4.setSpacingBefore(10f);
		p5.setSpacingBefore(10f);
		p6.setSpacingBefore(10f);
		p7.setSpacingBefore(10f);
		p8.setSpacingBefore(20f);
		p8.setSpacingAfter(10f);

		document.add(p1);

		LineSeparator separator = new LineSeparator();
		separator.setPercentage(100f);
		Chunk linebreak = new Chunk(separator);
		document.add(linebreak);

		document.add(p2);
		document.add(p3);
		document.add(p4);
		document.add(p5);
		document.add(p6);

		LineSeparator separator1 = new LineSeparator();
		separator.setPercentage(100f);
		Chunk linebreak1 = new Chunk(separator1);
		document.add(linebreak1);

		document.add(p7);
		document.add(p8);
//------------- Table ------------
		for (SubEvent subEvent : subEventList) {
			PdfPTable table = new PdfPTable(3);
//            table.setWidths(new int[]{1, 4});

			PdfPCell cell, cell1, cell2;
			cell = new PdfPCell(new Phrase(subEvent.getName()));
//            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table.addCell(cell);

			cell1 = new PdfPCell(new Phrase(String.valueOf(subEvent.getStartTime())));
//            cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(cell1);

			cell2 = new PdfPCell(new Phrase(String.valueOf(subEvent.getEndTime())));
//            cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell(cell2);
			document.add(table);
		}

		document.close();

	}

}