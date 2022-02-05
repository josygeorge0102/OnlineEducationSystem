node{
  stage('SCM Checkout'){
    git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
  }
  stage('Docker compose build'){
    bat 'docker-compose build'
  }
  stage('Docker Hub Login'){
   bat 'docker login -u="josy98" -p="Jo27148193*"' 
  }
  
  stage('Docker compose push'){
    bat 'docker-compose push'
  }
}
  
   
   
  

