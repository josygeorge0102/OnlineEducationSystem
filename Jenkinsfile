node{
   checkout scm
    
    docker.withRegistry('https://registry.hub.docker.com','dockerHub'){
        def customImage=docker.build("josy98/onlineeducationsystem")
        customImage.push()
    }
}
