import http from '../utils/http.js';

const user = {
  bar () {
    return http.get('/bar');
  },
  login (data) {
    return http.post('/login', data);
  },
  loginOut () {
    return http.get('/out');
  },
  register (data) {
    return http.post('/register', data);
  },
  getUserInfo () {
    return http.get('/getUserInfo');
  },
  checkTokenGet () {
    return http.get('/checkCors');
  },

  checkTokenPost (data) {
    return http.post('/checkCors', data);
  },

  checkTokenPut () {
    return http.put('/checkCors');
  },

  checkTokenDelete () {
    return http.delete('/checkCors');
  }
};

export default user;
