
const mqConfig = {
  attempts: 3,          
  backoff: {
    type: 'exponential',  
    delay: 5000            
  }};


module.exports = {mqConfig};