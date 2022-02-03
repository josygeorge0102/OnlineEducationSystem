node{
    stage('SCM Checkout'){
        git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
    }
    stage('Build Docker Image'){
       bat 'docker-compose up --build -d'
    }
}
