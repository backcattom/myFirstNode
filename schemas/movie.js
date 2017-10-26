var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

MovieSchema.pre('save', function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

MovieSchema.statics = {
	fetch: function(cb) { //取出数据库所有数据
		return this
		  .find({})
		  .sort('meta.updateAt') //按更新时间排序
		  .exec(cb)
	},
	findById: function(id, cb) { //查找一条数据
		return this
		  .findOne({_id: id})
		  .exec(cb)
	}
}

module.exports = MovieSchema