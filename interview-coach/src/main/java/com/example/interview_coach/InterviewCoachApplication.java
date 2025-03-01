package com.example.interview_coach;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class InterviewCoachApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewCoachApplication.class, args);
	}

	// ✅ CORS Configuration to allow requests from frontend
	@Configuration
	public static class WebConfig implements WebMvcConfigurer {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/api/**") // ✅ Allows all APIs under /api
					.allowedOrigins("http://localhost:3000") // ✅ Frontend URL
					.allowedMethods("GET", "POST", "PUT", "DELETE")
					.allowCredentials(true);
		}
	}
}
