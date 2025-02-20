pipeline {
    agent any

    environment {
        // Set environment variables
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
        PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT = '50000'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo "Cleaning workspace..."
                deleteDir()  // This will delete everything in the workspace
            }
        }

        stage('Git Clone') {
            steps {
                echo "Cloning the Git repository..."
                // Explicitly clone the repository to ensure it's fresh
                git branch: 'main', url: 'https://github.com/PriVik03/Playwright_Jules_Demo.git/'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers..."
                bat 'npx playwright install'
            }
        }

        stage('Install Allure Playwright Plugin') {
            steps {
                echo "Installing Allure Playwright plugin..."
                bat 'npm install -D allure-playwright'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                bat 'npx playwright test --project=chromium'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo "Generating Allure report..."
                bat 'npx allure generate ./allure-results -o ./allure-report --clean'
            }
        }

        stage('Open Allure Report') {
            steps {
                echo "Opening Allure report in Chrome..."
                // Open Allure report in Chrome (only works in Windows with Chrome installed)
                bat 'start chrome "file:///%WORKSPACE%/allure-report/index.html"'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up after the build...'
        }

        success {
            echo 'Build finished successfully!'
        }

        failure {
            echo 'Build failed!'
        }
    }
}
