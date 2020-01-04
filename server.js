const config = {
  host: 'localhost',
  port: 5432,
  database: 'SocialFeed',
  username: 'postgres',
  password: null, 
};
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

const bcrypt = require('bcrypt');

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || config);

const Sequelize = require('sequelize')
const UsersModel = require('./models/users')
const PostsModel = require('./models/posts')
const CommentsModel = require('./models/comments')

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// const sequelize = new Sequelize('social_feed_project', 'postgres', '', {
//     host: process.env.DATABASE_URL || 'localhost',
//     dialect: 'postgres',
//     pool: {
//       max: 10,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   })
const Users = UsersModel(sequelize, Sequelize)
const Posts = PostsModel(sequelize, Sequelize)
const Comments = CommentsModel(sequelize, Sequelize)

var app = express();

//MODELS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

//set the view engine to ejs
app.set('view engine', 'ejs');



//Joins
Users.hasMany(Posts, {foreignKey: 'user_id'})
Posts.belongsTo(Users, {foreignKey: 'user_id'})

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/api/posts', function (req, res) {
    Posts.findAll({include: [Users]}).then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

app.get('/api/posts/:id', function (req, res) {
    let id = req.params.id;
    
    db.one("SELECT * FROM post WHERE id=$1", [id])
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })

app.get('/api/users', function (req, res) {
    User.findAll() .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
    db.query('SELECT * FROM users')
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});

app.post('/api/posts', function (req, res) {
    let data = {
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id,
        image_url: req.body.image_url
    };
    Posts.create(data).then(function (post) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post));
    });
});
if(data.title && data.body && data && data.user_id){
    Posts.create(data).then(function (post) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post));
    }).catch(function(e){
        res.status(434).send('Unable to create the post.')
    });
} else {
    res.status(434).send('Title, body and user_id is required for making a post')
}
});
app.put('./api/post/:id', function(req, res){
    
})


app.post('/api/register', function (req, res) {
    let data = {
        email: req.body.email,
        password: req.body.password
    };
    if (data.email && data.password) {

        const saltRounds = 10;
        
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(data.password, salt);

        data['password'] = hash;

        Users.create(data).then(function(user){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        });;
    } else {
        res.status(434).send('Name, email and password is required to register')
    }
});

// db.post.create({name:'J'})

app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
})



