
pipeline{
  agent any  
  stages {

        stage ('checkout') {
            steps {
                git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
            }
        }
       stage ('Docker Compose Push') {
            steps {               
                withCredentials([usernamePassword(credentialsId: 'ACR', passwordVariable: 'ACR_PASSWORD', usernameVariable: 'ACR_USER')]){
                    bat 'docker login oesregistry.azurecr.io -u $ACR_USER -p $ACR_PASSWORD'
                    bat'docker-compose push'
                  }
            }
        }
      
  }
}
