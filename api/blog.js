var deal = require('../deal').deal;

console.log(deal)
exports.Blog = {
  uploadblog: function(req, res, formaturl) {
    console.log('update')
    deal.dealAdd(res, formaturl, 'Blog');
  },
  getbloglist: function(req, res, formaturl) {
    deal.dealSearch(res, formaturl, 'Blog');
  },
  getblogbyid: function(req, res, formaturl) {
    deal.dealSearch(res, formaturl, 'Blog');
  },
  delblog: function(req, res, formaturl) {
    deal.dealDel(res, formaturl, 'Blog');
  }
}
