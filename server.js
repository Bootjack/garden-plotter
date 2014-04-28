var app, express, jade, path;

express = require('express');
jade = require('jade');
path = require('path');

app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('layout');
});

app.get('/:page.html', function (req, res) {
    res.render(req.params.page);
});

app.listen(3000, function () {
   console.log('Garden Plotter running on 3000'); 
});
