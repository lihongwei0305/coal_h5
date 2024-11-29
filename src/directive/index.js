import permission from './permission.js';
import debounce from './debounce.js'


const comp = {
    permission,
    debounce,

}

export default {
    install(app) {
        for (const k in comp) {
            app.directive(k, comp[k])
        }

    },
};
