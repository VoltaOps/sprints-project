pipeline {
    agent {
        label "aws"   
    }
    environment {
        MONGO_URI = credentials('mongo-url')
    }
    stages {
        stage('Preparation'){
            steps{
                      stage('Preparation') {
            steps {
                // Get some code from a GitHub repository
                git branch:'master', url: 'https://github.com/VoltaOps/sprints-project'
            }
        }
        stage('Build') {
            steps {
                 withCredentials([usernamePassword(credentialsId:"dockerHub",usernameVariable:"username",passwordVariable:"passwd")]){
                sh """                
                    docker-compose build
                    docker login -u ${username} -p ${passwd}
                    docker push ${username}/nodeJs.v1
                """    
            }
           
        }
     }
        
      
        
        stage('deploy ') {
            steps {
            
                sh 'docker-compose up -d'
           
                }
            post {
          success {
                   slackSend (color: "#66ff66" , message: "pipeline succeeded ")
          }
          failure {
                  slackSend (color: "#ff3300", message: "pipeline unsucceeded")
          }
        }
            
        }
    }
}



