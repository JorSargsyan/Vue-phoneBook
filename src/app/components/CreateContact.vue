<template>

         <v-form ref="form" v-model="valid" >
           <h1>CREATE NEW CONTACT</h1>
            <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="100"
                label="Name"
                required
            ></v-text-field>
            <v-text-field 
            v-model="email"
                :rules="emailRules"
                ref="email"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="number"
                :rules="numberRules"
                :counter="100"
                label="Number"
                required
            ></v-text-field>
        <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
        >
            <v-text-field
                slot="activator"
                v-model="birthdate"
                label="Birthday date"
                prepend-icon="event"
                readonly
            ></v-text-field>
            <v-date-picker
                ref="picker"
                v-model="birthdate"
                required
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
            ></v-date-picker>
        </v-menu>
           <v-btn
      :disabled="!valid"
      @click="submitFormAndBlockUI"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
     </v-form >
</template>


<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "CreateContact",
  data() {
    return {
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 100) || "Name must be less than 100 characters"
      ],
      numberRules: [
        v => !!v || "Name is required",
        v =>
          /^\+(?:[0-9]●?){6,14}[0-9]$/.test(v) ||
          "Please type a valid phone number"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      menu: false,
      name: "",
      birthdate: "",
      number: ""
    };
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    clear() {
      this.$refs.form.reset();
    },
    submitFormAndBlockUI(){
       this.$emit("progressOn",true);
      this.submitForm();
    },
    submitForm() {
    
      let SubmitedJson = {
        name: this.name,
        birthDate: this.birthDate,
        emails: [
          {
            emailtext: this.email
          }
        ],
        numbers: [
          {
            numbertext: this.number
          }
        ],
        media: ""
      };
      this.$store.dispatch("submitForm", SubmitedJson).then(() => {
        this.$router.push("/contactslist");
         this.$emit("progressOn",false);
      });
    }
  }
};
</script>


<style>
input[type="file"] {
  position: absolute;
  top: -500px;
}

h1 {
  letter-spacing: 3px;
  font-weight: 100;
}

div.file-listing {
  width: 200px;
}

span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}
</style>

