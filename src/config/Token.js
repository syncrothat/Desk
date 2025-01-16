const token = localStorage.getItem('iss_token');

if (!token) {
    window.location.href = 'https://syncroapp.github.io/login';
}
  
export const Token = token;

export default Token;