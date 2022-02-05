node{
 
  stage('SCM Checkout'){
    git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
  }
  stage('Docker compose build'){
    bat 'docker-compose build '
  }
 
  
  stage('Docker compose push'){
     withCredentials([string(credentialsId: 'OESRegistry', variable: 'azure_registry_psw')]) {
      bat 'docker login oesregistry.azurecr.io -u OESRegistry -p ${azure_registry_psw}'
       bat 'docker-compose push'
    }
   
  }
}
  
   
   
  

