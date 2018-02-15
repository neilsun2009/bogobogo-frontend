let express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  Mock = require('mockjs'),
  app = express(),
  http = require('http').Server(app);
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(cookieParser());
app.get('/api/general', (req, res) => {
  // console.log(req);
  res.json(Mock.mock({
    result: true,
      data: {
        cats: {
          index: {
            primaryColor: '#00B8DE',
            secondaryColor: '#F8F7F2',
            layerBg: '',
            title: ''
          },
          more: {
            primaryColor: '#EE3831',
            secondaryColor: '#FEE500',
            layerBg: 'url(/assets/images/bg-more.png) repeat center',
            title: 'GOING GOING GONE'
          },
          bio: {
            primaryColor: '#008BCC',
            secondaryColor: '#FEDD00',
            layerBg: 'url("/assets/images/bg-bio-1.png") no-repeat left top, url("/assets/images/bg-bio-2.png") no-repeat right bottom',
            title: 'THIS IS ME'
          }
        }
      }
  }));
});
app.get('/*', (req, res) => {
  // console.log(req);
});
http.listen(4201, () => {
  console.log('Mock server is running on port 4201');    
});