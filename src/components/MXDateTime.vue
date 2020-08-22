<template>
  <b-form-input
    v-bind:value="toDatetimeLocal(value)"
    v-on:input="$emit('input', timezoneOffset($event))"
    type="datetime-local"
    step="1"
  ></b-form-input>
</template>

<script>
export default {
  name: "MXDateTime",
  props: {
    value: String,
  },
  methods: {
    ten(num) {
      return (num < 10 ? "0" : "") + num;
    },
    toDatetimeLocal(value) {
      console.log("value: " + value);
      var date = new Date(value);
      console.log(date.getHours());
      var YYYY = date.getFullYear(),
        MM = this.ten(date.getMonth() + 1),
        DD = this.ten(date.getDate()),
        HH = this.ten(date.getHours()),
        II = this.ten(date.getMinutes()),
        SS = this.ten(date.getSeconds());
      console.log("toDatetimeLocal: " + YYYY + "-" + MM + "-" + DD + "T" + HH + ":" + II + ":" + SS);
      return YYYY + "-" + MM + "-" + DD + "T" + HH + ":" + II + ":" + SS;
    },
    timezoneOffset(event) {
      console.log('Entering timezoneOffset');
      var offset = new Date(event).getTimezoneOffset();
      var sign = offset < 0 ? "+" : "-";

      var hours = Math.floor(offset / 60);
      var minutes = offset % 60;
      console.log("timezoneOffset: " + event + sign + this.ten(hours) + ":" + this.ten(minutes));
      return event + sign + this.ten(hours) + ":" + this.ten(minutes);
    },
  },
};
</script>