<template>
      <div class="emailItem">
          <p v-if="!editMode">{{item.emailtext}}</p>
          <v-text-field v-if="editMode"
              label='Update Email'
              v-model="newEmailField"
              ref="updateEmail"
              :rules="emailRules"
              >
          </v-text-field>
          <div class="navig-area">
          <v-btn v-if="!editMode" @click="toggleEditMode()" color="success" fab small dark>
              <v-icon>edit</v-icon>
          </v-btn>
          <v-btn v-if="!editMode && this.emailsListLength> 1"  @click="DeletedEmailDialog = true" color="error" fab small dark>
              <v-icon>delete</v-icon>
          </v-btn>
            <v-btn v-if="editMode"  @click="updateEmail(contact.id,item.emailid)" color="primary" fab small dark>
              <v-icon>save</v-icon>
          </v-btn>
         
            </div>
   <v-dialog
            v-model="DeletedEmailDialog"
            max-width="290"
            >
      <v-card>
        <v-card-title class="headline">Do you want to delete this email?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            @click="DeletedEmailDialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="success darken-1"
            @click="DeletedEmailDialog = false,deleteEmail(contact.id,item.emailid)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </div>
</template>


<script>

import {mapGetters} from "vuex";

export default {
    name:"EmailItem",
    props: ['item',"contact","emailsListLength"],
    data(){
        return{
            editMode : false,
            newEmailField : this.item.emailtext,
            DeletedEmailDialog: false,
            emailRules : [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
             ],
        }
    },
    computed:{
      ...mapGetters([
          'EmailsList',"getEmailListLength"
      ]),
    },
    methods: {
        resetEmail(){
            this.$refs.updateEmail.value = this.newEmailField
        },
        toggleEditMode(){
            this.editMode = !this.editMode;
        },
        deleteEmail(contactId,ItemId){
            let SubmitedJson = {
                contactId : contactId,
                ItemId : ItemId
            }
            this.$store.dispatch("deleteEmail",SubmitedJson)
        },
        updateEmail(contactId,ItemId){
             let SubmitedJson = {
                contactId : contactId,
                ItemId : ItemId,
                newEmail : this.newEmailField
            }
            //console.log(SubmitedJson);
             this.$store.dispatch("updateEmail",SubmitedJson);
            this.resetEmail();
            this.editMode = false;
        }
    }
}
</script>


<style>
    .emailItem{
        display: flex;
        align-items: center;
    }

    .emailItem p{
        flex: 4;
        margin: 0;
    }
    .emailItem .navig-area{
        width: 100px;
        display: flex;
        justify-content: center;
    }
</style>



