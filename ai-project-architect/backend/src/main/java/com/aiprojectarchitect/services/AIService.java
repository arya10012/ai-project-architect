package com.aiprojectarchitect.services;

import com.aiprojectarchitect.dtos.ProjectRequestDto;
import com.aiprojectarchitect.models.Project;
import com.aiprojectarchitect.repositories.ProjectRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Autowired
    private ProjectRepository projectRepository;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public Project generateProject(ProjectRequestDto request) throws Exception {
        
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        String prompt = "You are an AI Software Architect. Generate a software project idea based on the user's skills: " + 
                String.join(", ", request.getSkills()) + ", experience level: " + request.getExperienceLevel() + 
                ", and interest area: " + request.getInterest() + ". " +
                "Return the response strictly as valid JSON matching this exact structure: " +
                "{ \"title\": \"Project Name\", \"problemStatement\": \"Description\", \"uniqueSolution\": \"Solution architecture\", \"systemArchitecture\": \"Detailed flow mapping\", \"difficultyLevel\": \"level\", \"estimatedCompletionTime\": \"time\", \"keyFeatures\": [\"Feature 1\", \"Feature 2\", \"Feature 3\", \"Feature 4\", \"Feature 5\"], \"implementationSteps\": [\"Step 1\", \"Step 2\", \"Step 3\"], \"skillDistribution\": [{\"skill\": \"Skill Name\", \"percentage\": 50}, {\"skill\": \"Another\", \"percentage\": 50}], \"effortDistribution\": [{\"module\": \"Frontend\", \"percentage\": 40}, {\"module\": \"Backend\", \"percentage\": 60}] } " +
                "Ensure percentages sum up to 100 in distributions.";

        // Construct Gemini request payload
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> parts = new HashMap<>();
        parts.put("text", prompt);

        Map<String, Object> contents = new HashMap<>();
        contents.put("parts", List.of(parts));

        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("responseMimeType", "application/json");

        requestBody.put("contents", List.of(contents));
        requestBody.put("generationConfig", generationConfig);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        String url = geminiApiUrl + "?key=" + geminiApiKey;

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode root = objectMapper.readTree(response.getBody());
                String responseText = root.path("candidates").get(0)
                        .path("content").path("parts").get(0)
                        .path("text").asText();

                // Strip Markdown formatting if Gemini wraps the response
                if (responseText.startsWith("```json")) {
                    responseText = responseText.substring(7);
                }
                if (responseText.startsWith("```")) {
                    responseText = responseText.substring(3);
                }
                if (responseText.endsWith("```")) {
                    responseText = responseText.substring(0, responseText.length() - 3);
                }
                responseText = responseText.trim();

                System.out.println("Cleaned JSON from Gemini: " + responseText);

                // Deserialize the JSON text string provided by Gemini back into our Project model
                Project generatedProject = objectMapper.readValue(responseText, Project.class);

                // Bind the relationships (setProject on children)
                if (generatedProject.getSkillDistribution() != null) {
                    generatedProject.getSkillDistribution().forEach(d -> d.setProject(generatedProject));
                }
                if (generatedProject.getEffortDistribution() != null) {
                    generatedProject.getEffortDistribution().forEach(d -> d.setProject(generatedProject));
                }

                // Save and return
                return projectRepository.save(generatedProject);
            } else {
                throw new RuntimeException("Failed to reach Gemini AI API: " + response.getStatusCode());
            }
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            System.err.println("--- GEMINI API REJECTED REQUEST ---");
            System.err.println("Status: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("Gemini API Error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("--- GENERAL ERROR ---");
            e.printStackTrace();
            throw e;
        }
    }
}
