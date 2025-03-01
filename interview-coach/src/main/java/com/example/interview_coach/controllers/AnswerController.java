package com.example.interview_coach.controllers;

import com.example.interview_coach.models.Answer;
import com.example.interview_coach.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    // ✅ Get all answers
    @GetMapping
    public ResponseEntity<List<Answer>> getAllAnswers() {
        List<Answer> answers = answerService.getAllAnswers();
        return answers.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(answers);
    }

    // ✅ Get answer by ID (Use 'id' for answer, not rollNo)
    @GetMapping("/{id}")
    public ResponseEntity<Answer> getAnswerById(@PathVariable Long id) {
        return answerService.getAnswerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get answers by Question ID
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Answer>> getAnswersByQuestionId(@PathVariable Long questionId) {
        List<Answer> answers = answerService.getAnswersByQuestionId(questionId);
        return answers.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(answers);
    }

    // ✅ Get answers by User Email
    @GetMapping("/user")
    public ResponseEntity<List<Answer>> getAnswersByUserEmail(@RequestParam String email) {
        List<Answer> answers = answerService.getAnswersByUserEmail(email);
        return answers.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(answers);
    }

    // ✅ Get answers by Performance Level
    @GetMapping("/feedback/{performance}")
    public ResponseEntity<List<Answer>> getAnswersByPerformanceLevel(@PathVariable String performance) {
        List<Answer> answers = answerService.getAnswersByPerformanceLevel(performance);
        return answers.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(answers);
    }

    // ✅ Get latest 5 answers
    @GetMapping("/latest")
    public ResponseEntity<List<Answer>> getLatestAnswers() {
        List<Answer> latestAnswers = answerService.getLatestAnswers();
        return latestAnswers.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(latestAnswers);
    }

    // ✅ Get answers by Review Status
    @GetMapping("/review-status")
    public ResponseEntity<List<Answer>> getAnswersByReviewStatus(@RequestParam String status) {
        List<Answer> answers = answerService.getAnswersByReviewStatus(status);
        return answers.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(answers);
    }

    // ✅ Get Performance Summary (Statistics)
    @GetMapping("/statistics/performance")
    public ResponseEntity<Map<String, Long>> getAnswerStatistics() {
        return ResponseEntity.ok(answerService.getAnswerStatistics());
    }

    // ✅ Get User Performance Trend
    @GetMapping("/user/performance-trend")
    public ResponseEntity<Map<String, Long>> getUserPerformanceTrend(@RequestParam String email) {
        return ResponseEntity.ok(answerService.getUserPerformanceTrend(email));
    }

    // ✅ Review an answer
    @PutMapping("/{id}/review")
    public ResponseEntity<Answer> reviewAnswer(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(answerService.reviewAnswer(id, status));
    }

    // ✅ Submit Answer
    @PostMapping
    public ResponseEntity<Answer> submitAnswer(@RequestBody Answer answer) {
        Answer savedAnswer = answerService.saveAnswer(answer);
        return ResponseEntity.ok(savedAnswer);
    }
}
