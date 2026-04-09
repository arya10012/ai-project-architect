package com.aiprojectarchitect.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String problemStatement;
    @Column(columnDefinition = "TEXT")
    private String uniqueSolution;
    @Column(columnDefinition = "TEXT")
    private String systemArchitecture;
    private String difficultyLevel;
    private String estimatedCompletionTime;

    @ElementCollection
    @CollectionTable(name = "project_features", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "feature")
    private List<String> keyFeatures;

    @ElementCollection
    @CollectionTable(name = "project_steps", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "step")
    private List<String> implementationSteps;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<SkillDistribution> skillDistribution;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<EffortDistribution> effortDistribution;

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getProblemStatement() { return problemStatement; }
    public void setProblemStatement(String problemStatement) { this.problemStatement = problemStatement; }

    public String getUniqueSolution() { return uniqueSolution; }
    public void setUniqueSolution(String uniqueSolution) { this.uniqueSolution = uniqueSolution; }

    public String getSystemArchitecture() { return systemArchitecture; }
    public void setSystemArchitecture(String systemArchitecture) { this.systemArchitecture = systemArchitecture; }

    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public String getEstimatedCompletionTime() { return estimatedCompletionTime; }
    public void setEstimatedCompletionTime(String estimatedCompletionTime) { this.estimatedCompletionTime = estimatedCompletionTime; }

    public List<String> getKeyFeatures() { return keyFeatures; }
    public void setKeyFeatures(List<String> keyFeatures) { this.keyFeatures = keyFeatures; }

    public List<String> getImplementationSteps() { return implementationSteps; }
    public void setImplementationSteps(List<String> implementationSteps) { this.implementationSteps = implementationSteps; }

    public List<SkillDistribution> getSkillDistribution() { return skillDistribution; }
    public void setSkillDistribution(List<SkillDistribution> skillDistribution) {
        this.skillDistribution = skillDistribution;
        if(skillDistribution != null) skillDistribution.forEach(d -> d.setProject(this));
    }

    public List<EffortDistribution> getEffortDistribution() { return effortDistribution; }
    public void setEffortDistribution(List<EffortDistribution> effortDistribution) {
        this.effortDistribution = effortDistribution;
        if(effortDistribution != null) effortDistribution.forEach(d -> d.setProject(this));
    }
}
