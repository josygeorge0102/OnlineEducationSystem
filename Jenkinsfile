
pipeline{
  agent any  
  stages {

        stage ('checkout') {
            steps {
                git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
            }
        }
       stage ('Docker Compose Build') {
            steps {
                bat'docker-compose build'
            }
        }
       stage ('Docker Compose Push') {
            steps {                         
                   
                    bat'docker-compose push'          
            }
        }
      
  }
}
