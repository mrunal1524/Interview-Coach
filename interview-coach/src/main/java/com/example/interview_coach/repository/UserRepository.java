package com.example.interview_coach.repository;

import com.example.interview_coach.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { // Long here because rollNo is Long
    Optional<User> findByEmail(String email);
    Optional<User> findByRollNo(Long rollNo);  // Add this method to get user by rollNo
}
