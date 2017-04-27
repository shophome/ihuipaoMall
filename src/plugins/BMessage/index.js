import { initPlugin } from './src/message'

const BMessage = {
    install: (Vue, options) => {
        initPlugin(Vue, options);
    }
}

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== 'undefined' && window.Vue) {
    window.BMessage = BMessage;
}

export default BMessage