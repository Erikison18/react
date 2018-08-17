import {
    DEMO1
} from '@actions/demo1.js';

export let demo1 = (demo1 = true, action) => {
    switch (action.type) {
        case DEMO1:
            return action.demo1;
        default:
            return demo1;
    }
}