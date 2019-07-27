<template>
     <div class="numberItem">
          <p v-if="!editMode">{{item.numbertext}}</p>
           <v-text-field v-if="editMode"
              label='Update Number'
              v-model="newNumberField"
              ref="updateNumber"
              :rules="numberRules"
              >
          </v-text-field>
            <div class="navig-area">
          <v-btn v-if="!editMode" @click="toggleEditMode()" color="success" fab small dark>
              <v-icon>edit</v-icon>
          </v-btn>
          <v-btn v-if="!editMode && this.numbersListLength> 1"  @click="DeletedNumberDialog = true" color="error" fab small dark>
              <v-icon>delete</v-icon>
          </v-btn>
            <v-btn v-if="editMode"  @click="updateNumber(contact.id,item.numberid)" color="primary" fab small dark>
              <v-icon>save</v-icon>
          </v-btn>
         
            </div>
             <v-dialog
            v-model="DeletedNumberDialog"
            max-width="290"
            >
      <v-card>
        <v-card-title class="headline">Do you want to delete this Number?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            @click="DeletedNumberDialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="success darken-1"
            @click="DeletedNumberDialog = false,deleteNumber(contact.id,item.numberid)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </div>
</template>
<script>
export default {
  name: "NumberItem",
  props: ["item","numbersListLength","contact"],
  data() {
    return {
      editMode: false,
      newNumberField: this.item.numbertext,
      DeletedNumberDialog: false,
      numberRules: [
        v => !!v || "Name is required",
        v =>
          /^\+(?:[0-9]●?){6,14}[0-9]$/.test(v) ||
          "Please type a valid phone number"
      ]
    };
  },
  methods: {
    resetNumber() {
         this.$refs.updateNumber.value = this.newNumberField
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    deleteNumber(contactId, ItemId) {
      let SubmitedJson = {
        contactId: contactId,
        ItemId: ItemId
      };
      this.$store.dispatch("deleteNumber", SubmitedJson);
    },
    updateNumber(contactId, ItemId) {
      let SubmitedJson = {
        contactId: contactId,
        ItemId: ItemId,
        newNumber: this.newNumberField
      };
      //console.log(SubmitedJson);
      this.$store.dispatch("updateNumber", SubmitedJson);
      this.resetNumber();
      this.editMode = false;
    }
  }
};
</script>


<style>
.numberItem {
  display: flex;
  align-items: center;
}

.numberItem p {
  flex: 4;
  margin-bottom: 0;
}
.numberItem .navig-area {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>

