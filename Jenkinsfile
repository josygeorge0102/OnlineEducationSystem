node{
    stage('SCM Checkout'){
        git 'https://github.com/josygeorge0102/OnlineEducationSystem.git'
    }
    stage('Build Docker Image'){
       bat 'docker-compose up --build -d'
    }
    docker.withRegistry('https://registry.hub.docker.com','dockerHub'){
        def customImage=docker.build("josy98/onlineeducationsystem")
        customImage.push()
    }
}
