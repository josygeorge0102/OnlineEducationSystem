node{
   checkout scm
    
    docker.withRegistry('https://registry.hub.docker.com','josy98'){
        def customImage=docker.build("josy98/onlineeducationsystem")
        customImage.push()
    }
}
