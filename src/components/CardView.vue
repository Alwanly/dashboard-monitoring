<template>
  <v-card class="ma-3" :color="color">
    <v-list-item>
      <v-list-item-content class="text-left">
        <v-list-item-title
          v-if="!currency"
          class="mb-1 white--text text-h5 font-weight-bold"
          >{{ format(number) }}</v-list-item-title
        >
        <v-list-item-title
          v-else
          class="mb-1 white--text text-h5 font-weight-bold"
          >Rp {{ rupiah(number) }}</v-list-item-title
        >
        <v-list-item-subtitle class="white--text font-weight-light">{{
          label
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar size="90" tile class="mt-1">
        <v-icon size="100">{{ icon }}</v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>
<script>
import { gsap } from "gsap";
import {numberFormatComma} from "../plugins/script";
export default {
  props: {
    icon: String,
    color: String,
    label: String,
    value: Number,
    currency: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    number: 0,
  }),
  methods: {
     format: function (data) {
       return numberFormatComma(data)
    },    
    rupiah(bilangan) {
      var number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);
      if (ribuan) {
        var separator = sisa ? "," : "";
        rupiah += separator + ribuan.join(",");
      }
      return rupiah;
    },
    setNumber(){
      this.number = this.value
    }
  },
  mounted(){    
    this.setNumber()
  },
  watch: {
    value: function (newValue) {      
      gsap.to(this.$data, { duration: 0.5, number: newValue });
    },
  },
};
</script>