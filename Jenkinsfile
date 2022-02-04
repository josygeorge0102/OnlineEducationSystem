pipeline {
  environment {
    registry = "josy98/docker-test"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          bat 'docker compose version'
        }
      }
    }
  }
   
   
  

