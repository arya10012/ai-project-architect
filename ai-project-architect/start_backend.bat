@echo off
echo Starting AI Project Architect Backend Environment Set up...
set JAVA_HOME=%~dp0jdk-21.0.2+13
set PATH=%JAVA_HOME%\bin;%~dp0apache-maven-3.9.6\bin;%PATH%

echo Java Version configured to:
java -version

echo Maven Version configured to:
call mvn -version

cd backend
echo Launching Spring Boot server on port 8080...
mvn spring-boot:run
