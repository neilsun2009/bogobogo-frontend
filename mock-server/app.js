let express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  Mock = require('mockjs'),
  qiniu = require('qiniu'),
  // splashy = require('splashy'),
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
          layerBg: 'linear-gradient(135deg, rgba(255,255,255, 0.5) 0%, rgba(0,0,0,0) 50%)',
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
        },
        coding: {
          primaryColor: '#111111',
          secondaryColor: '#F4F5F0',
          layerBg: 'url("/assets/images/bg-coding.png") repeat center',
          title: '01000010'
        },
        design: {
          primaryColor: '#5F4B8B',
          secondaryColor: '#88B04B',
          layerBg: 'url("/assets/images/bg-design.png") repeat center',
          title: 'BEAUTY HUNT'
        },
        translation: {
          primaryColor: '#287558',
          secondaryColor: '#FFE5A5',
          layerBg: 'url("/assets/images/bg-translation.png") repeat center',
          title: '!@#$%^&*'
        },
        bytes: {
          primaryColor: '#C83773',
          secondaryColor: '#00B2A2',
          layerBg: 'url("/assets/images/bg-bytes.png") repeat center',
          title: 'A BYTE A DAY'
        },
        words: {
          primaryColor: '#61007D',
          secondaryColor: '#F6B700',
          layerBg: 'url("/assets/images/bg-words.png") repeat center',
          title: 'JIBBER JABBER'
        },
        blog: {
          primaryColor: '#EF6A00',
          secondaryColor: '#00AFD3',
          layerBg: 'url("/assets/images/bg-blog.png") repeat center',
          title: 'DAYS WITHOUT UPDATE'
        }
      }
    }
  }));
});
app.get('/api/articles', (req, res) => {
  const count = Math.floor(Math.random() *10) + 4;
  res.json(Mock.mock({
    result: true,
    'count|4-30': 100,
    // 'count': 0,
    ['data|' + 10]: [
      {
        id: '@id()',
        href: '@word()',
        title: '@title()',
        image: "@image('400x250', '@color')",
        tags: ['aaa', '@word()'],
        description: '@sentence()',
        cat: '@word()',
        'views|1-100': 100,
        updateTime: '@datetime',
        addTime: '@datetime',
        primaryColor: '@color',
        secondaryColor: '@color'
      }
    ]
  }))
});
app.get('/api/article', (req, res) => {
  const count = Math.floor(Math.random() *10) + 4;
  res.json(Mock.mock({
    result: true,
    data:{
      id: '@id()',
      href: '@word()',
      title: '@title()',
      image: "@image('800x500', '@color')",
      tags: ['aaa', '@word()'],
      description: '@sentence()',
      cat: '@word()',
      'views|1-100': 100,
      updateTime: '@datetime',
      addTime: '@datetime',
      primaryColor: '@color',
      secondaryColor: '@color',
      'paras|3-5': [{
        title: '@word()',
        cover: "@image('', '@color')",
        html: '@paragraph()'
      }]
    }
  }))
});
app.get('/api/session', (req, res) => {
  const count = Math.floor(Math.random() *10) + 4;
  res.json(Mock.mock({
    result: true,
    data:{
      id: '@id()',
      username: 'Bogo',
      access: 'administrator'
    }
  }))
});
app.get('/api/qiniu_token', (req, res) => {
  const accessKey = '9sq9OWStdFni0cLou2ChAboycAxvEiKHSc0nf4nZ';
  const secretKey = 'TmCbNS9Tw6YAnFVD8AGfiFGZuSYp3M9c6v8MdMBF';
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: 'neilsun2009',
  },
  putPolicy = new qiniu.rs.PutPolicy(options),
  uploadToken = putPolicy.uploadToken(mac);
  res.json({
    uptoken: uploadToken
  });
});
// app.get('/api/palette', (req, res) => {
//   console.log(req.query);
//   console.log(splashy);
//   splashy().fromUrl('req.query.img')
//     .then(result => {
//       res.json(result);
//     });
// });
app.get('/*', (req, res) => {
  // console.log(req);
});
app.post('/api/*', (req, res) => {
  res.json(Mock.mock({
    result: true,
    data:{
      id: '@id()',
      href: '@word()'
    }
  }))
});
app.put('/api/*', (req, res) => {
  res.json(Mock.mock({
    result: true,
    data:{
      id: '@id()',
      href: '@word()'
    }
  }))
});
app.delete('/api/*', (req, res) => {
  res.json(Mock.mock({
    result: true,
    data: null
  }))
});
http.listen(4201, () => {
  console.log('Mock server is running on port 4201');    
});