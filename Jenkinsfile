pipeline {
  agent {
    docker {
      image 'node:16'
    }
  }

  environment {
    HOME = "${WORKSPACE}"
    NPM_CONFIG_PREFIX=".npm"
    NPM_CONFIG_CACHE="npm_cache"
  }

  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
    disableConcurrentBuilds()
  }

  stages {
    stage('Yarn') {
      steps {
        sh 'npm install -g yarn'
        // sh 'yarn plugin import workspace-tools'
        // sh 'yarn set version berry'
      }
    }

    stage('Install') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Lint') {
      steps {
        sh 'yarn lint'
      }
    }

    stage('Test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}
