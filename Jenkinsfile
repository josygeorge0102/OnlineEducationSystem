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
          dockerImage = bat 'docker compose build'
        }
      }
    }
    stage('Deploy Image') {
      steps{
       
         
            bat 'docker compose push'
          
        }
      }
    
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}
