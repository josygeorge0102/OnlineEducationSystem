node{
 environment{
   registryName="OESRegistry"
  registryUrl="oesregistry.azurecr.io"
  registryCredential="OESRegistryAzure"
 }
 
  stage('SCM Checkout'){
    git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
  }
  stage('Docker compose build'){
    bat 'docker-compose build '
  }
 
  
  stage('Docker compose push'){
    withCredentials([string(credentialsId: 'OESRegistry', variable: 'azurepassword')]) {
     script{
        docker.withRegistry("http://${registryUrl}",registryCredential)
        bat 'docker-compose push'
     }
   } 
   }    
}
  
   
   
  

