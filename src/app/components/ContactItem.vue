<template>
    <div class="item">
        <div class="img-area">
             <router-link :to="'/contact/' + item.id">
            <img v-if="item.mediaUploaded" :src="require(`../assets/${item.media}`)"  class="image">
             <div v-if="!item.mediaUploaded"   class="image_letter">
                {{item.name[0]}}
              </div>
             </router-link>
        </div>
        <div class="text-area">
            <p class="name">{{item.name}}</p>
            <p  class="mail">{{item.emails[0].emailtext}}</p>
        </div>
        <div class="navig-area">
             <router-link :to="'/contact/' + item.id">
             <v-btn color="primary" fab small dark>
                    <v-icon>account_circle</v-icon>
            </v-btn>
             </router-link>
         
             <v-btn  @click="CallDialog = true" color="success" fab small dark>
              <v-icon>call</v-icon>
            </v-btn>
              <v-btn   @click="MessageDialog = true" color="warning" fab small dark>
              <v-icon>message</v-icon>
            </v-btn>
             <v-btn   @click="EmailDialog = true" color="primary" fab small dark>
              <v-icon>email</v-icon>
            </v-btn>
               <v-btn   @click="Deletedialog = true" color="error" fab small dark>
              <v-icon>delete_sweep</v-icon>
            </v-btn>
        </div>

<!-- dialog for delete -->
        <v-dialog
            v-model="Deletedialog"
            max-width="290"
            >
      <v-card>
        <v-card-title class="headline">Do you want to delete this contact?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            @click="Deletedialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="success darken-1"
            @click="Deletedialog = false,deleteContact(item)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- dialog for call -->
    <v-dialog
            v-model="CallDialog"
            max-width="400"
            >
      <v-card>
        <v-card-title class="headline">Contact Numbers</v-card-title>
            <v-card-text>
                <ul class="numbers">
                    <li v-for="numItem in item.numbers" v-bind:key="numItem.numberid">
                        <a :href="`tel:${numItem.numbertext}`">
                            {{numItem.numbertext}}
                        </a>
                    </li>
                </ul>
            </v-card-text>

      </v-card>
    </v-dialog>

    <!-- dialog for email -->

        <v-dialog
            v-model="EmailDialog"
            max-width="400"
            >
      <v-card>
        <v-card-title class="headline">Contact Emails</v-card-title>
            <v-card-text>
                <ul class="numbers">
                    <li v-for="emailItem in item.emails" v-bind:key="emailItem.emailid">
                        <a :href="`mailto:${emailItem.emailtext}`">
                            {{emailItem.emailtext}}
                        </a>
                    </li>
                </ul>
            </v-card-text>

      </v-card>
    </v-dialog>


        <v-dialog
            v-model="MessageDialog"
            max-width="400"
            >
      <v-card>
        <v-card-title class="headline"> Send Message</v-card-title>
            <v-card-text>
                <ul class="numbers">
                    <li v-for="numItem in item.numbers" v-bind:key="numItem.numberid">
                        <a :href="`sms:${numItem.numbertext}`">
                            {{numItem.numbertext}}

                        </a>
                    </li>
                </ul>
            </v-card-text>

      </v-card>
    </v-dialog>




   </div>
</template>


<script>
import {mapActions} from "vuex"
import {mapGetters} from "vuex"

export default {
    name: "ContactItem",
    props: ['item'],
    data(){
        return{
            Deletedialog : false,
            EmailDialog : false,
            CallDialog : false,
            MessageDialog: false
        }
    },
    methods : {
        ...mapActions([
            'deleteContact'
        ])
    }
}
</script>


<style scoped>

ul.numbers{
    list-style-type: none;
    font-size: 16px;
    padding: 0;
}

ul.numbers li{
    border: 1px solid #666666;
    padding: 15px 5px;
    text-align: center;
    margin-bottom: 10px;
    background: #353535;
    letter-spacing: 1px;
    font-size: 21px;
}


.image_letter{
    background-color: rgb(219, 222, 22);
    height: 100px;
    width: 100px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-size: 55px;
    align-items: center;
}


.v-card__actions{
    display: block;
}

ul.numbers li a{
    text-decoration: none!important;
    color:inherit!important
}

#contactList .item{
    margin-bottom: 10px;
}
</style>
