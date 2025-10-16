pipeline {
    agent any
    tools {
            jdk 'jdk-21'
            maven 'maven-3.8'
            nodejs 'node-20'
    }
    stages {
        stage('Checkout'){
            steps{
                echo 'code from git'
                checkout scm
            }
        }
        stage('Build Java Project'){
            steps {
                echo 'build with maven'
                sh 'mvn clean install'
            }
        }
        stage('JS linting'){
            steps {
                echo 'install dependencies'
                sh 'npm cache clean --force'
                sh 'rm -rf node_modules'
                sh 'npm install'

                echo 'check code'
                sh 'npm run lint || true'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarQubeServer') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
        stage('Quality Gate Check') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
    post {
        always {
            echo 'final'
            cleanWs()
        }
    }
}