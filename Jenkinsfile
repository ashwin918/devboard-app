pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        BACKEND_IMAGE  = "ashwinemcbalaji/devboard-backend"
        FRONTEND_IMAGE = "ashwinemcbalaji/devboard-frontend"
        DOCKERHUB_CREDENTIALS = "dockerhub-cred1"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('List Files') {
            steps {
                bat 'dir'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        bat """
                        ${scannerHome}\\bin\\sonar-scanner.bat ^
                        -Dsonar.projectKey=devboard-app ^
                        -Dsonar.projectName=DevBoardApp ^
                        -Dsonar.sources=.
                        """
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:latest", "backend")
                    docker.build("${FRONTEND_IMAGE}:latest", "frontend")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        docker.image("${BACKEND_IMAGE}:latest").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    bat 'docker stop devboard-backend || exit 0'
                    bat 'docker rm devboard-backend || exit 0'
                    bat 'docker stop devboard-frontend || exit 0'
                    bat 'docker rm devboard-frontend || exit 0'

                    bat "docker run -d -p 5000:5000 --name devboard-backend ${BACKEND_IMAGE}:latest"
                    bat "docker run -d -p 3000:80 --name devboard-frontend ${FRONTEND_IMAGE}:latest"
                }
            }
        }
    }
}
