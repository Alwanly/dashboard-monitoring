import Vue from 'vue';
Vue.component('animated-number', {
  template:"{{ displayNumber }}",
  props: {'number': { default:0 }},

  data () {
    return {
      displayNumber:0,
      interval:false
    }
  },

  ready () {
    this.displayNumber = this.number ? this.number : 0;
  },

  watch: {
    number () {
      clearInterval(this.interval);

      if(this.number == this.displayNumber) {
        return;
      }

      this.interval = window.setInterval(() => {
        if(this.displayNumber != this.number) {
          var change = (this.number - this.displayNumber) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, 20);
    }
  }
})
