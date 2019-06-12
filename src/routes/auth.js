module.exports  = function(app) {    

    let auth = require('../controller/auth');

    app.route('/')
       .get((req, res) => { res.send('Finansys version 1'); });

    app.route('/api/v1/authentication')  
       .post(auth.authentication); 

    app.use('/api/*', auth.requireAuthentication);  
      
};