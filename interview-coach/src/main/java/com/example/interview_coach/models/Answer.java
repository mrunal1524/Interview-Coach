package com.example.interview_coach.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "answers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Keep 'id' for the Answer model

    @ManyToOne(fetch = FetchType.EAGER) // ✅ Ensure question details are fetched
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answerText;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(name = "review_status", nullable = false)
    private String reviewStatus = "Pending";  // Default status: Pending
}
