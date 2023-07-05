class JestCustomReporter {

    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunComplete(test, results) {
        const {
            numFailedTests,
            numPassedTests,
            numPendingTests,
            testResults,
            startTime,
        } = results;

        var cmd = null;
        
        if(numFailedTests == 0 && numPendingTests == 0){
            cmd = 'osascript -e \'display notification "Jest Test Runner" with title "Tests passed" \
            subtitle "All Tests passed" sound name "Hero"\'';
            // Sounds: ls /System/Library/Sounds    
        }
        if(numFailedTests > 0){
            cmd = 'osascript -e \'display notification "Jest Test Runner" with title "Tests failed" \
            subtitle "Test fail: '+ numFailedTests +'" sound name "Ping"\'';            
        }

        if( cmd !== null){
            require('child_process').exec(cmd, function (error, stdout, stderr) { 
                if(error != null) console.log(error); 
            });
        }

    }
}

module.exports = JestCustomReporter;