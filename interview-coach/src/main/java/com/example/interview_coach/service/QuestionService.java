package com.example.interview_coach.service;

import com.example.interview_coach.models.Question;
import com.example.interview_coach.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public List<Question> getQuestionsByCategory(String category) {
        return questionRepository.findByCategory(category);
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(Long id, Question updatedQuestion) {
        return questionRepository.findById(id)
                .map(question -> {
                    question.setQuestionText(updatedQuestion.getQuestionText());
                    question.setCategory(updatedQuestion.getCategory());
                    return questionRepository.save(question);
                }).orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question with ID " + id + " not found");
        }
        questionRepository.deleteById(id);
    }
}
