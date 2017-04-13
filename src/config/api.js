// var baseUrl = 'http://rap.taobao.org/mockjsdata/15806';
var baseUrl = 'http://tpshop.ihuipao.cn/index.php/ajax';

export default {
	get_homeData: {
		url: baseUrl + '/index/data',
		method: 'GET',
	},
	get_categoryData: {
		url: baseUrl + '/goods/category',
		method: 'GET',
	},
	get_productData: {
		url: baseUrl + '/goods/goodsinfo',
		method: 'GET',
	},
	// get_carousel: {
	// 	url: 'http://rap.taobao.org/mockjsdata/15806/carousel',
	// 	// url: 'http://tpshop.ihuipao.cn/index.php/ajax/index/carousel',
	// 	method: 'GET',
	// },
	// get_newProduct: {
	// 	// url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
	// 	url: 'http://rap.taobao.org/mockjsdata/15806/newProduct',
	// 	method: 'GET',
	// },
}
