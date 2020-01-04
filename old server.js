const config = {
    host: 'localhost',
    port: 5432,
    database: 'SocialFeed',
    user: 'postgres'
  };
  var express = require('express');
  var bodyParser = require('body-parser');
  var cors = require('cors')
  
  const pgp = require('pg-promise')();
  const db = pgp(config);
  
  const Sequelize = require('sequelize')
  const UsersModel = require('./models/users')
  
  const sequelize = new Sequelize('social_feed', 'postgres', '', {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
  const Users = UsersModel(sequelize, Sequelize)
  
  
  var app = express();
  
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors())
  
  
  // app.get('/api/posts', function (req, res) {
  //   db.query('SELECT * FROM posts')
  //       .then((results) => {
  //           res.setHeader('Content-Type', 'application/json');
  //           res.end(JSON.stringify(results));
  //       })
  //       .catch((e) => {
  //           console.error(e);
  //       });
  // });
  
  // app.get('/api/posts/:id', function (req, res) {
  //   let id = req.params.id;
  //   db.one("SELECT * FROM posts WHERE id=$1", [id])
  //       .then((results) => {
  //           res.setHeader('Content-Type', 'application/json');
  //           res.end(JSON.stringify(results));
  //       })
  //       .catch((e) => {
  //           console.error(e);
  //       });
  // });
  
  // // A route for getting all the comments in your database
  // app.get('/api/comments', function (req, res) {
  //   db.query('SELECT * FROM comments JOIN users on comments.user_id = user.id')
  //       .then((results) => {
  //           res.setHeader('Content-Type', 'application/json');
  //           res.end(JSON.stringify(results));
  //       })
  //       .catch((e) => {
  //           console.error(e);
  //       });
  // });
  // // A route for getting all the comments from a single user
  // app.get('/api/comments/:user_id', function (req, res){
  //     const userId = req.params.user_id
  
  //   db.query('SELECT * FROM comments JOIN users ON comments.user_id=user.id WHERE users.id=$1', [id])
  //   .then((results) => {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(JSON.stringify(results));
  // })
  //   .catch((e) => {
  //     console.error(e);
  //   });
  // })
  // // A route for getting all the comments that belong to a post
  
  // app.get('/api/comments/:post/:id', function (req, res) {
  //   let post_id = req.params.post_id;
  
  //   db.query('SELECT * FROM comments JOIN users on comments.user_id = users.id WHERE comments.post_id=$1', [post_id])
  //       .then((results) => {
  //           res.setHeader('Content-Type', 'application/json');
  //           res.end(JSON.stringify(results));
  //       })
  //       .catch((e) => {
  //           console.error(e);
  //       });
  // });
  
  // // A route for getting all the users
  
  // app.get('api/users', function (req,res) {
  //     let data = {
  //         id: req.body.id,
  //         email: req.body.body,
  //         user_id: req.body.user_id,
  //         image_url: req.body.image_url
  //     };
  // })
  
  
  
  
  // //Example curl : curl --data "title=homewardbound&body=greatbook&user_id=1" http://localhost:3000/api/posts
  // app.post('/api/posts', function (req, res) {
  //   let data = {
  //       title: req.body.title,
  //       body: req.body.body,
  //       user_id: req.body.user_id,
  //       image_url: req.body.image_url
  //   };
  //   let query = "INSERT INTO posts(title, body, user_id, image_url) VALUES (${title}, ${body}, ${user_id}, ${image_url}) RETURNING id";
  //   db.one(query, data)
  //       .then((result) => {
  //           db.one("SELECT * FROM posts JOIN users ON posts.user_id=users.id WHERE posts.id=$1", [result.id])
  //               .then((results) => {
  //                   res.setHeader('Content-Type', 'application/json');
  //                   res.end(JSON.stringify(results));
  //               })
  //               .catch((e) => {
  //                   console.error(e);
  //               });
  //       })
  //       .catch((e) => {
  //           console.error(e);
  //       });
  // });
  // app.put('/api/posts/:id', function (req, res) {
  //   let id = req.params.id;
  //   let data = {
  //       id: id,
  //       title: req.body.title,
  //       body: req.body.body,
  //       image_url: req.body.image_url
  //   };
  //   let query = "UPDATE posts SET title=${title}, body=${body}, image_url=${image_url} WHERE id=${id}";
  //   db.one(query, data)
  //       .then((result) => {
  //           db.one(query, data)
  //               .then((result) => {
  //                   db.one("SELECT * FROM posts JOIN users ON posts.user_id=users.id WHERE posts.id=$1", [result.id])
  //                       .then((results) => {
  //                           res.setHeader('Content-Type', 'application/json');
  //                           res.end(JSON.stringify(results));
  //                       })
  //                       .catch((e) => {
  //                           console.error(e);
  //                       });
  //               })
  //               .catch((e) => {
  //                   console.error(e);
  //               });
  //       })
  //       .catch((e) => {
  //           console.error(e);
  //       });
  // });
  // app.delete('/api/posts/:id', function (req, res) {
  //   let id = req.params.id;
  //   let query = `DELETE FROM posts WHERE id=${id}`;
  //   db.result(query)
  //       .then((result) => {
  //           res.setHeader('Content-Type', 'application/json');
  //           res.end(JSON.stringify(result));
  //       })
  //       .catch((e) => {
  //           console.error(e);
  //       });
  // });
  // Example curl : curl --data "name=john&amp;email=john@example.com&password=abc123" http://localhost:3000/api/register
  app.post('/api/register', function (req, res) {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };


    if (data.email && data.password) {

        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(myPlaintextPassword, salt);

        let query = "INSERT INTO users(email, password) VALUES (${name}, ${email}, ${password}) RETURNING id";
        db.one(query, data)
            .then((result) => {
                db.one("SELECT * FROM users WHERE id=$1", [result.id])
                    .then((results) => {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(results));
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            })
            .catch((e) => {
                console.error(e);
            });
    } else {
        res.status(434).send('Email and password is required to register')
    }
  });
  app.post('/api/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (email && password) {
        db.one(`SELECT * FROM users WHERE email=${email}`)
            .then((results) => {
                if (results.password == password) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                } else {
                    res.status(434).send('Email/Password combination did not match')
                }
            })
            .catch((e) => {
                res.status(434).send('Email does not exist in the database')
            });
    } else {
        res.status(434).send('Both email and password is required to login')
    }
  });
  
  app.get('/api/users', function (req, res) {
      User.findAll() .then((results) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(results));
      });
      /*db.query('SELECT * FROM users')
          .then((results) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(results));
          })
          .catch((e) => {
              console.error(e);
          });*/
  });
  
  
  app.post('/api/register', function (req, res) {
      let data = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
      };
      if (data.name && data.email && data.password) {
          Users.create(data).then(function(user){
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(user));
          });;
      } else {
          res.status(434).send('Name, email and password is required to register')
      }
  });
  
  app.listen(3000, function () {
    console.log('Todo List API is now listening on port 3000...');
  })
  
  
  
  