// var baseUrl = process.env.NODE_ENV == 'development' ? '/index.php/ajax' : '';
var baseUrl ='/index.php/ajax';

export default {
	get_userData: {
		url: baseUrl + '/user/index',
		method: 'GET',
	},
	get_searchData: {
		url: baseUrl + '/goods/search',
		method: 'GET',
	},
	get_cartData: {
		url: baseUrl + '/cart/cartlist',
		method: 'GET',
	},
	add_cartData: {
		url: baseUrl + '/cart/addcart',
		method: 'POST',
	},
	change_cartData: {
		url: baseUrl + '/cart/changecart?_d',
		method: 'POST',
	},
	del_cartData: {
		url: baseUrl + '/cart/delCart',
		method: 'POST',
	},
	get_orderData: {
		url: baseUrl + '/cart/cart2',
		method: 'GET',
	},
	add_order: {
		url: baseUrl + '/cart/addorder',
		method: 'POST'
	},
	get_homeData: {
		url: baseUrl + '/index/data',
		method: 'GET',
	},
	get_categoryData: {
		url: baseUrl + '/goods/category',
		method: 'GET',
	},
	get_brandData: {
		url: baseUrl + '/goods/brand',
		method: 'GET',
	},
	get_categoryListData: {
		url: baseUrl + '/goods/goodslist',
		method: 'GET',
	},
	get_brandListData: {
		url: baseUrl + '/goods/goodslist',
		method: 'GET',
	},
	get_goodsData: {
		url: baseUrl + '/goods/goodsinfo',
		method: 'GET',
	},
	get_commentData: {
		url: baseUrl + '/goods/consult',
		method: 'GET',
	},
	get_orderDetail: {
		url: baseUrl + '/user/order_detail',
		method: 'GET',
	},
	get_addressData: {
		url: baseUrl + '/user/address_list',
		method: 'GET',
	},
	del_addressData: {
		url: baseUrl + '/user/address_del',
		method: 'POST',
	},
	add_addressData: {
		url: baseUrl + '/user/address_add',
		method: 'POST',
	},
	default_addressData: {
		url: baseUrl + '/user/address_default',
		method: 'POST',
	},
	post_addressEdit: {
		url: baseUrl + '/user/address_edit',
		method: 'POST'
	}
}
