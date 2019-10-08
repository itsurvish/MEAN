/* GET 'about us' page */
module.exports.about = function(req, res){
  res.render('about', { title: 'About book worm' });
};
