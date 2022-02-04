node{
  stage('SCM Checkout'){
    git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
  }
  stage('Docker compose build'){
    bat 'docker compose build'
  }
  stage('Docker comose push'){
    bat 'docker compose push' 
  }
}
  
   
   
  

