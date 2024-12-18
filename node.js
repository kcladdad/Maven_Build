const axios = require('axios');

// Parse Slack slash command payload
const params = event.body.text.split(" ").reduce((acc, item) => {
  const [key, value] = item.split("=");
  acc[key] = value;
  return acc;
}, {});

// Jenkins API details
const JENKINS_URL = "http://18.206.171.167:8080/job/MyJOB/buildWithParameters";
const JENKINS_USER = "admin";
const JENKINS_TOKEN = "11cdd326bbe37788c0366066457bbfa1e8";

axios.post(JENKINS_URL, {}, {
  params: params,
  auth: {
    username: JENKINS_USER,
    password: JENKINS_TOKEN,
  }
}).then(() => {
  $respond({
    status: 200,
    body: `Jenkins job triggered with params: ${JSON.stringify(params)}`,
  });
}).catch((error) => {
  $respond({
    status: 500,
    body: `Failed to trigger Jenkins job: ${error.message}`,
  });
});
