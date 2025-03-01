package com.example.interview_coach.service;

import com.example.interview_coach.models.Answer;
import com.example.interview_coach.models.Question;
import com.example.interview_coach.repository.AnswerRepository;
import com.example.interview_coach.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private FeedbackService feedbackService;

    // ✅ Get all answers
    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    // ✅ Get answer by ID
    public Optional<Answer> getAnswerById(Long id) {
        return answerRepository.findById(id);
    }

    // ✅ Get answers by Question ID
    public List<Answer> getAnswersByQuestionId(Long questionId) {
        return answerRepository.findByQuestion(
                questionRepository.findById(questionId)
                        .orElseThrow(() -> new RuntimeException("Question with ID " + questionId + " not found"))
        );
    }

    // ✅ Get answers by User Email
    public List<Answer> getAnswersByUserEmail(String userEmail) {
        return answerRepository.findByUserEmail(userEmail);
    }

    // ✅ Get answers by Performance Level
    public List<Answer> getAnswersByPerformanceLevel(String performanceLevel) {
        return answerRepository.findAll().stream()
                .filter(answer -> answer.getFeedback() != null && answer.getFeedback().contains("Performance Level: " + performanceLevel))
                .collect(Collectors.toList());
    }

    // ✅ Get answers by Review Status
    public List<Answer> getAnswersByReviewStatus(String status) {
        return answerRepository.findAll().stream()
                .filter(answer -> status.equalsIgnoreCase(answer.getReviewStatus()))
                .collect(Collectors.toList());
    }

    // ✅ Get answer statistics (Counts of Good, Needs Improvement, Poor)
    public Map<String, Long> getAnswerStatistics() {
        long goodCount = 0;
        long needsImprovementCount = 0;
        long poorCount = 0;

        for (Answer answer : answerRepository.findAll()) {
            String feedback = answer.getFeedback();
            if (feedback != null) {
                feedback = feedback.toLowerCase();

                // Update count based on feedback
                if (feedback.contains("performance level: good")) {
                    goodCount++;
                } else if (feedback.contains("performance level: needs improvement")) {
                    needsImprovementCount++;
                } else if (feedback.contains("performance level: poor")) {
                    poorCount++;
                }
            }
        }

        // Prepare the final map
        Map<String, Long> performanceMap = new HashMap<>();
        performanceMap.put("Good", goodCount);
        performanceMap.put("Needs Improvement", needsImprovementCount);
        performanceMap.put("Poor", poorCount);

        return performanceMap;
    }

    // ✅ Get latest 5 answers
    public List<Answer> getLatestAnswers() {
        return answerRepository.findAll().stream()
                .sorted(Comparator.comparing(Answer::getId).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    // ✅ Get User Performance Trend
    public Map<String, Long> getUserPerformanceTrend(String email) {
        List<Answer> userAnswers = answerRepository.findByUserEmail(email);

        // Initialize counters for performance levels
        long goodCount = 0;
        long needsImprovementCount = 0;
        long poorCount = 0;

        // Loop through the answers and count the performance levels
        for (Answer answer : userAnswers) {
            String feedback = answer.getFeedback();
            if (feedback != null) {
                feedback = feedback.toLowerCase();

                // Update count based on feedback
                if (feedback.contains("performance level: good")) {
                    goodCount++;
                } else if (feedback.contains("performance level: needs improvement")) {
                    needsImprovementCount++;
                } else if (feedback.contains("performance level: poor")) {
                    poorCount++;
                }
            }
        }

        // Prepare the final map with counts
        Map<String, Long> performanceMap = new HashMap<>();
        performanceMap.put("Good", goodCount);
        performanceMap.put("Needs Improvement", needsImprovementCount);
        performanceMap.put("Poor", poorCount);

        return performanceMap;
    }

    // ✅ Review an answer
    public Answer reviewAnswer(Long id, String status) {
        List<String> validStatuses = Arrays.asList("Pending", "Reviewed", "Approved", "Rejected");

        return answerRepository.findById(id).map(answer -> {
            if (!validStatuses.contains(status)) {
                throw new RuntimeException("Invalid review status: " + status);
            }
            answer.setReviewStatus(status);
            return answerRepository.save(answer);
        }).orElseThrow(() -> new RuntimeException("Answer not found with ID: " + id));
    }

    // ✅ Save an answer with feedback
    public Answer saveAnswer(Answer answer) {
        if (!questionRepository.existsById(answer.getQuestion().getId())) {
            throw new RuntimeException("Cannot submit answer: Question with ID " + answer.getQuestion().getId() + " does not exist.");
        }

        // ✅ Generate feedback before saving
        String feedback = feedbackService.generateFeedback(answer.getAnswerText());
        answer.setFeedback((feedback == null || feedback.isEmpty()) ? "Feedback not available" : feedback);
        answer.setReviewStatus("Pending");  // ✅ Default review status

        return answerRepository.save(answer);
    }
}
