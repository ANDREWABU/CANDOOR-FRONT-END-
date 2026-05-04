pipeline {
  agent any
  environment {
        AGENT_LABEL = ''
  }

  stages {

    stage("Set Agent Label") {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        currentBranch = 'production'
                        build = 'production'
                    } else if (env.BRANCH_NAME == 'development') {
                        currentBranch = 'development'
                        build = 'staging'
                    } else {
                        currentBranch = 'development'
                        build = 'staging'
                    }
                    script {
                        AGENT_LABEL = currentBranch
                    }
                }
            }
        }

    stage('Build and Stash') {
      steps {      
            script { 
                if (env.BRANCH_NAME == "development") {
                    echo 'triggered by development'
                    sh '''    
                    unset CI
                    sudo npm run build:staging

                    '''
                 } else {
                echo 'triggered by something else'
                    

                sh'''    
                unset CI
                echo "triggered by production"
                sudo npm run build:production

                '''
                 }
                stash(name: 'build', includes: 'build/**/*')
                
            }
        }
    }

    stage('Transfer to Staging Agent') {
            agent {
                label "${AGENT_LABEL}"
            }
            steps {
                unstash 'build'
            }
        } 
    stage('Update Build') {
            agent {
                label "${AGENT_LABEL}"
            }
        steps {
            script { 
                dir('scripts') {
                    // Execute the 'update-build.sh' script
                    
                    if (env.BRANCH_NAME == "development") {
                        echo 'triggered by development'
                        sh '''    
                        sudo ./update-dev.sh

                        '''
                    } else {
                           echo 'triggered by something else'
                           sh'''    
                           sudo ./update-prod.sh
                           '''
                     }
                }
            }
        }

    }
    
        
  }   
}