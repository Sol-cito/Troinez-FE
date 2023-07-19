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

        stage('Install dependencies (yarn install)') {
            steps {
                dir("${projectDir}") {
                    echo ">>>> [Log] start yarn install..."

                    sh "sudo yarn install --save --legacy-peer-deps"

                    echo ">>>> [Log] yarn install ended"                    
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

        stage('PM2 start or reload') {
            steps {
                dir("${projectDir}") {
                    echo ">>>> [Log] pm2 start or reload start..."

                    sh "yarn pm2:${PROFILE}"

                    echo ">>>> [Log] pm2 start or reload success!!!"
                }                
            }
        }

        stage('Nextjs Server health check') {
            steps {
                dir("${deployScriptDir}") {
                    echo ">>>> [Log] Nextjs healthcheck start"

                    // sh "bash healthCheck.sh ${PROFILE}"

                    echo ">>>> [Log] Nextjs healthCheck success!!"
                }
            }
        }
    }
}