package com.example.interview_coach.service;

import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    public String generateFeedback(String answerText) {
        if (answerText == null || answerText.trim().isEmpty()) {
            return "No answer provided. Please give a detailed response. Performance Level: Poor";
        }

        String feedback;
        int score = 0;

        // **Improved Classification Based on Length and Content**
        if (answerText.toLowerCase().contains("java") && answerText.length() > 50) {
            feedback = "Great job! You provided a detailed response.";
            score += 3;
        } else if (answerText.toLowerCase().contains("java") && answerText.length() > 25) {
            feedback = "Good explanation! Consider adding an example.";
            score += 2;
        } else if (answerText.toLowerCase().contains("java") && answerText.length() > 15) {
            feedback = "Your response is too short. Add more explanation.";
            score += 1;
        } else {
            feedback = "Try to provide a more structured answer with relevant keywords.";
            score = 0;
        }

        // **Assign Performance Level**
        String performance;
        if (score >= 3) {
            performance = "Performance Level: Good";
        } else if (score == 2) {
            performance = "Performance Level: Needs Improvement";
        } else {
            performance = "Performance Level: Poor";
        }

        return feedback + " " + performance;
    }
}
