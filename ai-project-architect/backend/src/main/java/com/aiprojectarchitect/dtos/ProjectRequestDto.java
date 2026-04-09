package com.aiprojectarchitect.dtos;

import java.util.List;

public class ProjectRequestDto {

    private List<String> skills;
    private String experienceLevel;
    private String interest;

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getInterest() { return interest; }
    public void setInterest(String interest) { this.interest = interest; }
}
