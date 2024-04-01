# Logging

The Tach RA uses logger package from `package/logger` folder. We've chosen to utilize a static set of log levels matching those of `npm`:

- error
- warn
- info
- http
- verbose
- debug
- silly

## Currently Supported Loggers

- winston

### Winston Configuration

```javascript
// logger.config.ts
import { Logger } from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';


...
 new WinstonLogger(
      createLogger({
        level: this.config?.level || 'info',
        format: format.combine(format.json(), format.timestamp()),
        transports: [], // transport services like console, cloudwatch
      }),
      this.name,
    );
```

## Usage

To use the logger package from `logger` as a workspace package, then call `create`. This method takes a name string as a parameter. This name will be include in the json of all log messages for more granular filtering.

```typescript
import { Logger, LoggerInterface } from 'logger';

const logger = new Logger('BE-Nest', {level: 'info',}).create();
logger.info('Hello World!');
logger.error('error', 'An Error Occurred', { errorCode: 500 });
logger.debug('Debugging Info'), { myVar });
```
