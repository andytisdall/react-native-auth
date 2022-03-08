import axios from 'axios';

export default axios.create({
  // For development, this url needs to be
  // copied and pasted from the running ngrok service
  // which is forwarding to the local server

  baseURL: 'http://1714-192-184-164-49.ngrok.io',
});
