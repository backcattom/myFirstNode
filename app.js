var express = require ('express') //加载express模块
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')//单独安装 新版本已经分离 对post请求的请求体进行解析
var _ = require('underscore')
var Movie = require('./models/movie')

var port = process.env.PORT || 3000 //设置端口
var app = express()   
//mongoose.Promise = global.Promise             
var db = mongoose.connect('mongodb://localhost:27017/imooc', {useMongoClient: true}) //连接并设置数据库的名字
db.on('error', function (err) {console.log(err)})
app.set('views', './views/pages') //设置视图根目录
app.set('view engine', 'jade') //设置模版引擎
app.use(bodyParser.urlencoded({ extended: true }))  //将表单数据格式化 请使用true  ，false会报错
// app.use(bodyParser.json())
app.locals.moment = require('moment') //载入moment模块，格式化日期 设置为本地的moment
app.use(express.static(path.join(__dirname, 'public'))) //静态资源获取 拼接
app.listen(port)
console.log('imooc start ok'+port)

//index page
app.get('/', function(req, res) {	
	Movie.fetch(function(err, movies){
		if(err){
			alert('hellow')
			console.log(err)
		}
		res.render('index', {
			title: '首页',
			movies: movies
		})		
	})
})

//detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id
	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: 'imooc'+movie.title,
			movie: movie
		})
	})
})

//admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: '后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})
//admin update movie 修改数据
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id
	if(id){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			}
			res.render('admin', {
				title: 'imooc后台更新',
				movie: movie
			})
		})
	}
})





//admin post movie  插入数据
app.post('/admin/movie/new', function(req, res) { //注意：req是请求体、res是响应体 之前运行报错就是因为这个写反了
	var id = req.body.movie._id //req.body 是通过body-parse解析后得到的呢
	var movieObj = req.body.movie
	var _movie
	if(id !== 'undefined') {//如果id已经存在
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if(err){
					console.log(err)
				}

				res.redirect('/movie/'+movie._id)
			})
		})
	} else {
		_movie = new Movie({
			title: movieObj.title,
			doctor: movieObj.doctor,
			country: movieObj.country,
			year: movieObj.year,
			poster: movieObj.poster,
			flash: movieObj.flash,
			summary: movieObj.summary,
			language: movieObj.language

		})
		_movie.save(function(err, movie){
			if(err){
				console.log(err)
			}

			res.redirect('/movie/'+movie._id)
		})		
	}
})
//list page
app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
		if(err) {
			console.log(err)
		}

		res.render('list', {
			title: '列表页',
			movies: movies
		})
	})
})

//删除数据
app.delete('/admin/list', function(req, res){
	var id = req.query.id;
	if(id) {
		Movie.remove({_id: id}, function(err, movie) {
			if(err){
				console.log(err)
			} else {
				res.json({success:1})
			}

		})
	}
})