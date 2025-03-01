package com.example.interview_coach.repository;

import com.example.interview_coach.models.Answer;
import com.example.interview_coach.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByQuestion(Question question);  // No change needed
    List<Answer> findByUserEmail(String userEmail);  // No change needed

}
