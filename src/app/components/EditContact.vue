
<template>
<div id="editContact" v-if="Editablecontact">
        <div class="item">
            <div class="img-area" >
              <div class="img-inner">
                <img  v-if="Editablecontact.mediaUploaded" :src="require( `../assets/${Editablecontact.media}`)"  class="image">
                 
                <div v-if="!Editablecontact.mediaUploaded"   :style="backgroundColors"  class="image_letter">
                <span> {{Editablecontact.name[0]}} </span>  
               
                 </div>
                     <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" style="display:none"/>
                <label fab small dark for="file" class="add_photo_trigger" ><v-icon>add_a_photo</v-icon></label>
               
              </div>
             
                <h4 class="name">{{Editablecontact.name}}</h4>
                    <div class="navig-area">
               
              <v-btn fab small dark v-show="fileUploaded"  v-on:click="submitFile(Editablecontact)"><v-icon>add</v-icon></v-btn> 
                <router-link :to="'/contact/' + Editablecontact.id">
                <v-btn  color="success" fab small dark>
                <v-icon >home</v-icon>
                </v-btn> 
                </router-link>
                <v-btn  color="error" fab small dark>
                <v-icon @click="DeletedDialog = true">delete_sweep</v-icon>
                </v-btn> 
               
            </div>
            </div>
             <v-layout row wrap>

              
                  <div class="text-area first">
                    <v-form ref="AddEditEmail"  v-model="validAddEditEmail">
                      <div class="form-control">
                        <v-text-field
                          label="New Email"
                          v-model="newEmail"
                            :rules="emailRules"
                        >
                        </v-text-field>
                        <v-btn :disabled="!validAddEditEmail" @click="AddEmail(Editablecontact.id,newEmail)" color="primary">
                          <v-icon>add</v-icon>
                        </v-btn>
                         </div>
                    </v-form>

                    <div class="emails-list">
                      <div  v-for="email in EmailsList" :key="email.emailtext" >
                        <EmailItem :item=email :emailsListLength="EmailsList.length" :contact=Editablecontact></EmailItem>
                        </div>
                    </div>
                  </div>
                 
                 
                  <div class="text-area">
                    <v-form ref="AddEditNumber" v-model="validAddEditNumber">
                        <div class="form-control">
                        <v-text-field
                          label="New Number"
                          v-model="newNumber"
                        :rules="numberRules"
                        >
                        </v-text-field>
                        <v-btn :disabled="!validAddEditNumber" @click="AddNumber(Editablecontact.id,newNumber)" color="primary">
                          <v-icon>add</v-icon>
                        </v-btn>
                         </div>
                    </v-form>
                    <div class="numbers-list">
                      <div v-for="num in NumbersList" :key="num.numbertext">
                      <NumberItem :item=num :numbersListLength="NumbersList.length" :contact=Editablecontact></NumberItem>
                      </div>
                    </div>
                  </div>
             </v-layout>
        
        </div>

        <!-- dialog for delete -->
        <v-dialog
            v-model="DeletedDialog"
            max-width="290"
            >
      <v-card>
        <v-card-title class="headline">Do you want to delete this contact?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            @click="DeletedDialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="success darken-1"
            @click="DeletedDialog = false,deleteContact(Editablecontact)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </div>
</template>


<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import VueUploadComponent from "vue-upload-component";
import EmailItem from "./EmailItem";
import NumberItem from "./NumberItem";




export default {
  name: "EditContact",
  data() {
    return {
      DeletedDialog: false,
      validEditForm: true,
      validAddEditEmail: true,
      validAddEditNumber: true,
      fileUploaded: false,
      file: "",
      date: "",
      newEmail: "",
      newNumber: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      numberRules: [
        v => !!v || "Name is required",
        v =>
          /^\+(?:[0-9]●?){6,14}[0-9]$/.test(v) ||
          "Please type a valid phone number"
      ]
    };
  },
  components: {
    EmailItem,
    NumberItem
  },
  props: ["id"],
  computed: {
    backgroundColors() {
      let Colors = [
        "#283173",
        "#73cca7",
        "#622063",
        "#981e1e",
        "#3a7328",
        "#dbde16",
        "#ff6d17"
      ];
      return `background-color : ${Colors[Math.floor(Math.random() * 7) + 1]}`;
    },
    Editablecontact() {
      return this.$store.getters.ContactItemFromID(Number(this.id));
    },
    EmailsList() {
      return this.$store.getters.EmailsList(Number(this.id));
    },
    NumbersList() {
      return this.$store.getters.NumbersList(Number(this.id));
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileUploaded = true;
    },
    submitFile(Editablecontact) {
      this.$emit("progressOn", true);
      let json = {
        file: this.file,
        id: Editablecontact.id
      };
      let success = false;
      if (success == false) {
        this.$store.dispatch("uploadPhoto", json);
        success = true;
      }
      setTimeout(() => {
          if (success == true) {
          this.$emit("progressOn", false);
          this.fileUploaded = false;
        }
      },1000);
    },
    deleteContact(Editablecontact) {
      this.$store.dispatch("deleteContact", Editablecontact);
      this.$router.push("/contactslist");
    },
    submitEditForm() {
      console.log("Form submited");
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    clearEmail() {
      this.$refs.AddEditEmail.reset();
    },
    clearNumber() {
      this.$refs.AddEditNumber.reset();
    },
    AddEmail(ContactId, newEmail) {
      let SubmitedJson = {
        id: ContactId,
        newEmail: newEmail
      };
      this.$store.dispatch("addEmail", SubmitedJson);
      this.clearEmail();
    },
    AddNumber(ContactId, newNumber) {
      let SubmitedJson = {
        id: ContactId,
        newNumber: newNumber
      };
      this.$store.dispatch("addNumber", SubmitedJson);
      this.clearNumber();
    }
  }
};
</script>


<style scoped>
.v-card__title.headline {
  justify-content: center;
}

#editContact .item .text-area {
  flex: 4;
  padding-top: 20px;
  text-align: justify;
  background: #424242;
  margin-top: 27px;
  padding: 30px;
  box-shadow: 0 0 7px 8px #0000000f;
}

h4 {
  font-size: 29px;
}

#editContact .item .text-area.first {
  margin-right: 30px;
  width: 100%;
}

#editContact .item .text-area {
  width: 100%;
}

.image_letter {
  background-color: rgb(219, 222, 22);
  height: 150px;
  width: 150px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-size: 85px;
  align-items: center;
}

.form-control {
  display: flex;
  align-items: center;
}

.add_photo_trigger {
  position: absolute;
  opacity: 0;
  top: 65px;
  left: calc(50% + 48px);
  background: rgb(167, 4, 4);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 7px;
  cursor: pointer;
  transition: 0.5s all;
}

#editContact .item .img-area .img-inner {
  display: inline;
}

#editContact .item .img-area .img-inner:hover .add_photo_trigger {
  opacity: 1;
}

form.photo {
  display: inline-block;
}

#editContact .item .img-area {
  flex: 2;
  padding: 30px;
  box-shadow: 0px 1px 8px 5px #19191940;
  background: #dbde16;
}

#editContact .item .navig-area {
  flex: 4;
  padding-top: 27px;
  display: flex;
  justify-content: flex-end;
}

#editContact .item .text-area .name {
  font-size: 22px;
  font-weight: 600;
  margin: 15px 0;
}

#editContact .item .text-area .emails-list,
#editContact .item .text-area .numbers-list {
  list-style: none;
  padding: 15px 0;
}

label {
  padding: 10px 0;
}

#editContact .item .text-area .emails-list .emailItem,
#editContact .item .text-area .numbers-list .numberItem {
  padding: 10px 20px;
  font-size: 16px;
  font-style: italic;
  letter-spacing: 1px;
  margin: 10px 0;
  background: #2f2f2f;
  box-shadow: 0 0 0px 2px #00000014;
  color: #c3c3c3;
  flex-direction: column;
}

#editContact .item .text-area ul hr {
  background-color: #c3c3c3;
}

#editContact .item .text-area .date {
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 100;
}

#editContact .item .img-area .image {
  border-radius: 50%;
  height: 200px;
  border: 3px solid white;
  width: 200px;
  object-fit: cover;
}

#editContact .item .text-area .mail {
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  font-style: italic;
}

@media screen and (max-width: 576px) {
  #editContact .item .text-area.first {
    margin-right: 0;
  }
}
</style>


