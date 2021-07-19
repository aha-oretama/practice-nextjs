# testerve-ui

## How to use testerve

### Dashboard

Access https://testerve.vercel.app/.

### Generate the API key

By integrating the repository from the above dashboard, the API key will be shown.    
This API key belongs to the repository.

### Upload the test report

Generate the junit format report, and upload it by using the `cli.js` with API key.

```shell
$ node bin/cli.js -t $TESTERVE_API_KEY -u https://testerve.vercel.app/ test-results/jest/junit.xml
```

## Contribution

### Develop

```bash
$ npm run docker-start:development
$ npm run db-migrate:development
$ npm run dev
```

### Test

```bash
$ npm run test
```

### CI

CircleCI automatically checks some requirements.  
The following items must be passed.

- ci/circleci: lint
- ci/circleci: test

### CD

Testerve is running on the vercel.  
The main branch and pull request are automatically deployed to vercel. 
