node{
    stage('SCM Checkout'){
        git 'https://github.com/josygeorge0102/Sample2.git'
    }
    stage('Build Docker Image'){
       bat 'docker-compose up --build -d'
    }
}
