import Vue from 'vue'
import API from '../config/api'
import getData from '../service/getData'

function apiFactory(api, params) {
	var customActions = {
	    foo: {method: api.method, url: api.url},
  	}
  	var resource = Vue.resource(api.url, params, customActions);
  	return resource.foo().then(response => {
		return response.body;
  	});
}

export default {
	actions: {
		getCarousel({}, params) {
			return apiFactory(API.get_carousel, params);
		},
		getNewProduct({}, params) {
			return apiFactory(API.get_newProduct, params);
		},
	}
}
