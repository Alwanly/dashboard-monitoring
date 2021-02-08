import idle from 'idle-vue';
import Vue from 'vue';

const eventHub = new Vue()

Vue.use(idle,{
    envetEmitter: eventHub,
    idleTime:60000,
    startAtIdle:false
})