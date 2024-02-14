# performance-test
Performance Testing 

**Tools :** k6

**Test site :** [Link here](https://test.k6.io)

**Test site 2 :** [Link here](https://reqres.in/)

### Step

1. Initialisation
   - *Import the following package :* `import { check, group } from "k6";` and `import http from "k6/http"`
   - **Code in** *export default function*
2. How to run it
   - Open a terminal and go to the file path file_name
   - *Run :* `k6 run file_name.js`
3. Reporting
   - *Go to :* [html summary k6](https://github.com/benc-uk/k6-reporter) in *Multiple outputs*
   - *Import the following package :* `import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";` and `import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";`
   - *Add the following code (**outside** export default function) :* `export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}`
    - **Run** : *How to do it like no. 2*
    - Go to `new_file.html` path in terminal
    - *Run :* `open new_file.html` or **Open it in the browser**
4. Custom runs
   - *10 virtual users 5 second :* `k6 run --vus 10 --duration 5s file_name.js`
   - **Notes :** After running, open reporting file *new_file.html* or **refresh** the file that has been open in the browser
5. How to perform load testing
   - **Before** *export default function*, add **options**
   - **Run and watch reporting** : *How to do it like no. 2 & 3*