package com.example.interview_coach.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Keep 'id' for Question model (don't rename it to roll_no)

    @Column(nullable = false)
    private String questionText;

    @Column(nullable = false)
    private String category; // Example: "Java", "Python", "HR Questions"
}
