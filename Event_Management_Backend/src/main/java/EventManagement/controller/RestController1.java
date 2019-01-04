package EventManagement.controller;

import EventManagement.model.User;
import EventManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RequestMapping(value = "/rest")
@RestController
public class RestController1 {
    @Autowired private UserRepository userRepository;
	
	@GetMapping("/admin")
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<User> getAll() {
	    return userRepository.findAll();
	}

	@DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {
		userRepository.deleteUsersById(id);
		return new ResponseEntity<>("Customer has been deleted!", HttpStatus.OK);
	}
}