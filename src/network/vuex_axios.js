import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 5000;

export function send_data(config) {
  const sendData = axios.create({
    method:'post',
  })
  return sendData(config)
}

