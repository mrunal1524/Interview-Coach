package com.example.interview_coach.controllers;

import com.example.interview_coach.models.User;
import com.example.interview_coach.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // ✅ Allows frontend requests
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }

    // ✅ Get user by Roll No (Renamed from id to rollNo)
    @GetMapping("/{rollNo}")
    public ResponseEntity<User> getUserByRollNo(@PathVariable Long rollNo) {
        return userService.getUserByRollNo(rollNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // ✅ Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists with email: " + user.getEmail());
        }

        // ✅ Store password as plain text (since security is removed)
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // ✅ Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        System.out.println("Login attempt with email: " + email + " and password: " + password);  // Debugging log

        Optional<User> user = userService.getUserByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(user.get()); // Successful login
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }

    // ✅ Update user details
    @PutMapping("/{rollNo}")
    public ResponseEntity<?> updateUser(@PathVariable Long rollNo, @RequestBody User updatedUser) {
        try {
            User updated = userService.updateUser(rollNo, updatedUser);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ✅ Delete user
    @DeleteMapping("/{rollNo}")
    public ResponseEntity<?> deleteUser(@PathVariable Long rollNo) {
        try {
            userService.deleteUser(rollNo);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
