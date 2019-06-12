module.exports  = function(app) {    

    app.route('/api/v1/test')
       .get((req, res) => { res.send({test: "Version 1"}); });
      
};