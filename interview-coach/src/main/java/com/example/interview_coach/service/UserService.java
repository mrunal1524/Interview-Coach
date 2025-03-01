package com.example.interview_coach.service;

import com.example.interview_coach.models.User;
import com.example.interview_coach.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Get user by Roll No (renamed from id to rollNo)
    public Optional<User> getUserByRollNo(Long rollNo) {
        return userRepository.findById(rollNo);
    }

    // ✅ Get user by Email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ Check if a user exists by email
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // ✅ Save/Register a new user
    public User saveUser(User user) {
        if (existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("User already exists with email: " + user.getEmail());
        }

        // Ensure that rollNo is manually assigned before saving
        if (user.getRollNo() == null) {
            throw new IllegalArgumentException("Roll number is required.");
        }

        return userRepository.save(user);
    }

    // ✅ Update user details
    public User updateUser(Long rollNo, User updatedUser) {
        return userRepository.findById(rollNo)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());

                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                        user.setPassword(updatedUser.getPassword());
                    }

                    return userRepository.save(user);
                }).orElseThrow(() -> new RuntimeException("User not found with rollNo: " + rollNo));
    }

    // ✅ Delete a user
    public void deleteUser(Long rollNo) {
        if (!userRepository.existsById(rollNo)) {
            throw new RuntimeException("User with rollNo " + rollNo + " not found");
        }
        userRepository.deleteById(rollNo);
    }
}
