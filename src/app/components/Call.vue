<template>
<div id="call">
   
 <v-form v-model="valid">
     <v-text-field
                v-model="number"
                :counter="20"
                :rules= numberRules
                label="Number"
                required
            ></v-text-field>
            <input type="tel">
 </v-form>
            <div class="call-navig">
            <a :href="`tel:${this.number}`">
              <v-btn  @click="CallDialog = true" :disabled="!valid" color="success" fab small dark>
              <v-icon>call</v-icon>
           
            </v-btn>
               </a>
                <v-btn   @click="MessageDialog = true" :disabled="!valid" color="warning" fab small dark>
              <v-icon>message</v-icon>
            </v-btn>
              </div>
</div>
</template>


<script>
export default {
  name: "Call",
  data() {
    return {
      valid: true,
      number: "",
      numberRules: [
        v => !!v || "Number is required",
        v =>
          /^\+(?:[0-9]●?){6,14}[0-9]$/.test(v) ||
          "Please type a valid phone number"
      ]
    };
  }
  
};
</script>
<style>

  
</style>

