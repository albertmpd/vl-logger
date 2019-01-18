Logger library for AWS Lambda applications using node.


Example Usage
-------------

```node
//create a logger.js file in your project
// Singleton logger
// Is called once per lambda instance start up (not per invocations)

let Logger = require('vs-logger');
let logger = null;
let SERVICE_NAME = 'a-service-name';
let SERVICE_LOGLEVEL = 'debug'; //possible values 'silly', 'verbose', 'debug', 'info', 'warn', 'error'

if (!logger) {
  logger = Logger.createConsoleLogger({ name: SERVICE_NAME }, { logLevel: SERVICE_LOGLEVEL });
}

logger.debug('Started %s level %s...', SERVICE_NAME, SERVICE_LOGLEVEL);
module.exports = logger;
```

```node
//other-file.js
let logger = require('./logger');
logger.warn('some value !!!');
```
```node
//any-other-file.js
let logger = require('./logger');
logger.info('some value !!!');
```

```
dependencies
  convict
```
