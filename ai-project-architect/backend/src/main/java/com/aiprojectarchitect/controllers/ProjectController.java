package com.aiprojectarchitect.controllers;

import com.aiprojectarchitect.dtos.ProjectRequestDto;
import com.aiprojectarchitect.models.Project;
import com.aiprojectarchitect.services.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*") // Allow React Frontend to connect
public class ProjectController {

    @Autowired
    private AIService aiService;

    @PostMapping("/generate")
    public ResponseEntity<Project> generateProject(@RequestBody ProjectRequestDto request) {
        try {
            Project generatedProject = aiService.generateProject(request);
            return ResponseEntity.ok(generatedProject);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
