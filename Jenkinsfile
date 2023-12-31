def projectDir = "/data/next/Troinez-FE-${PROFILE}"


pipeline {
    agent any

    stages {
        stage('Check parameterized Profile') {
            steps {
                echo ">>>> [Log] Current profile is ${PROFILE}"
            }
        }

        stage('Pipeline Health Check') {
            steps {
                echo "Hello Troinez FE!"
            }
        }

        stage('Clone project repository (Git clone)') {
            steps {
                dir("${projectDir}") {
                    echo ">>>> [Log] Git clone..."

                    git branch: 'develop', credentialsId: 'Dasol-github', url: 'https://github.com/Sol-cito/Troinez-FE'

                    echo ">>>> [Log] cloning succeeded"
                }
            }
        }

        stage('Install dependencies (npm install)') {
            steps {
                dir("${projectDir}") {
                    echo ">>>> [Log] start npm install..."

                    sh "npm i --save --legacy-peer-deps"

                    echo ">>>> [Log] npm install ended"                    
                }
            }
        }

        stage('Eslint') {
            steps {
                dir("${projectDir}") {
                    echo "[Log] check lint"

                    sh "yarn lint"

                    echo "[Log] lint success!!!"
                }                
            }
        }

         stage('Build') {
            steps {
                dir("${projectDir}") {
                    echo "[Log] project build"

                    sh "yarn build"

                    echo "[Log] build success!!!"
                }                
            }
        }

        stage('PM2 start as a Test server') {
            steps {
                dir("${projectDir}") {
                    echo ">>>> [Log] pm2 test server start..."

                    sh "yarn pm2:${PROFILE}"

                    echo ">>>> [Log] pm2 test server up success!!!"
                }                
            }
        }

        stage('Cypress E2E test') {
            steps {
                dir("${projectDir}") {
                    // echo ">>>> [Log] E2E Test on the test server...."

                    // sh "yarn test:e2e"

                    // echo ">>>> [Log] E2E Test success!!!"
                }                
            }
        }

        stage('Kill PM2 test server') {
            steps {
                dir("${projectDir}") {
                    echo ">>>> [Log] Killing PM2 Test server..."

                    sh "yarn pm2:kill"

                    echo ">>>> [Log] Killing PM2 Test server success!!!"
                }                
            }
        }

        stage('Docker image build') {
            steps {
                dir("${projectDir}") {
                    echo ">>>> [Log] Docker image build start..."

                    sh "yarn docker-build:${PROFILE}"

                    echo ">>>> [Log] Docker image build success!!!"
                }                
            }
        }

        stage('Blue Green Deployment') {
            steps {
                dir("${projectDir}") {
                    echo "[Log] Blue Green Deployment running..."

                    sh "bash ./docker-deploy/dockerRun.sh ${PROFILE}"
                }                
            }
        }
    }
}