const sonarqubeScanner =  require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl: process.env.SONAR_URL,
        token : process.env.SONAR_TOKEN,
        options : {
            'sonar.projectName': process.env.SONAR_PROJECT_NAME,
            'sonar.sources':  'src',
            'sonar.tests':  '__tests__',
            'sonar.inclusions'  :  '**',
            'sonar.test.inclusions':  'src/**/*.spec.ts,src/**/*.test.ts',
            'sonar.typescript.lcov.reportPaths':  'coverage/lcov.info',
            'sonar.typescript.coverage.reportPaths':  'coverage/clover.xml',
            'sonar.typescript.tslint.reportPaths': 'src/**/*.ts'
        }
    }, 
    () => {process.exit()}
);
