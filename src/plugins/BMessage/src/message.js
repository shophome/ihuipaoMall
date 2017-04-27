let instance;
let flag = true;

export const initPlugin = function(Vue, options) {
    Vue.BMessage = Vue.prototype.$BMessage = message;
    let MessageConstructor = Vue.extend(require('./BMessage.vue'));
    instance = new MessageConstructor({
        data: options
    });
    instance.vm = instance.$mount();
    instance.vm.visible = false;
    instance.dom = instance.vm.$el;
};

const message = {
    show: (message, options) => {
        if(flag) {
            flag = false;
            document.body.appendChild(instance.vm.$el);
            instance.vm._data.options = options;
            instance.vm._data.message = message;
            instance.vm._data.show = true;
            setTimeout(() => {
                instance.vm._data.show = false;
            }, 2000)
            setTimeout(() => {
                document.body.removeChild(instance.vm.$el);
                flag = true;
            }, 2300)
        }
    },
}