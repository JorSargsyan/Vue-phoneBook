<template>
<div id="contact" v-if="contact">
        <div class="item">
        <div class="img-area" >
            <img v-if="contact.mediaUploaded" :src="require(`../assets/${contact.media}`)"  class="image">
              <div v-if="!contact.mediaUploaded" :style="backgroundColors"  class="image_letter">
               <span>{{contact.name[0]}}</span> 
              </div>
               <h4 class="name">{{contact.name}}</h4>
                <div class="navig-area">
                  <router-link :to="'/contact/' + contact.id + '/edit'">
                  <v-btn   color="success" fab small dark>
                  <v-icon>edit</v-icon>
                </v-btn> 
                </router-link>
        </div>
        </div>
        <div class="text-area">
            <p class="date">{{contact.birthDate}}</p>
            <ul>
                <li>E-Mails</li>
                <li class="mail" v-for="email in contact.emails" v-bind:key="email.emailtext">{{email.emailtext}}</li>
                <hr>
                <li>Numbers</li>
                <li class="number" v-for="number in contact.numbers" v-bind:key="number.numbertext">{{number.numbertext}}</li>
            </ul>
        </div>
        </div>
        </div>
</template>


<script>
import { mapGetters } from "vuex";
import {mapActions} from "vuex";

export default {
  name: "ContactDetails",
  data(){
    return{
      Deletedialog : false
    }
  },
  props: ["id"],
  computed: {
    contact() {
      return this.$store.getters.ContactItemFromID(Number(this.id));
    },
    backgroundColors(){
      let Colors =["#283173","#73cca7","#622063","#981e1e","#3a7328","#dbde16","#ff6d17"]
      return  `background-color : ${ Colors[Math.floor(Math.random()*7) +1] }`
    }
  },
   methods : {
        ...mapActions([
            'deleteContact'
        ])
    }
};
</script>


<style scoped>
#contactList .item {
  background: #424242;
  border: 1px solid #4f4f4f;
  box-shadow: 0 0 4px 4px #0000000a;
  display: flex;
  padding: 20px 20px;
  justify-content: space-between;
}

.v-card__title.headline {
  justify-content: center;
}

#contact .item .text-area {
  flex: 4;
  padding-top: 20px;
  text-align: justify;
      background: #424242;
    margin-top: 27px;
    padding: 30px;
    box-shadow: 0 0 7px 8px #0000000f;
}

h4{
      font-size: 29px;
}

#contact .item .img-area {
  flex: 2;
  padding: 30px;
    box-shadow: 0px 1px 8px 5px #19191940;
    background: #981e1e;
}

#contact .item .navig-area {
  flex: 4;
  padding-top: 27px;
  display: flex;
  justify-content: flex-end;
}

#contact .item .text-area .name {
  font-size: 22px;
  font-weight: 600;
  margin:  15px 0;
}

#contact .item .text-area ul{
    list-style: none;
    padding: 15px 0
}

#contact .item .text-area ul li{
    padding: 20px 10px;
    font-size: 16px;
    font-style: italic;
    letter-spacing: 1px;
    margin: 10px 0;
    background: #2f2f2f;
    box-shadow: 0 0 0px 2px #00000014;
    color: #c3c3c3;
}

#contact .item .text-area ul hr{
    background-color: #c3c3c3;
}


.image_letter{
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

#contact .item .text-area .date{
        font-size: 17px;
    letter-spacing: 1px;
    font-weight: 100;
}

#contact .item .img-area .image {
  border-radius: 50%;
  height: 200px;
  border: 3px solid white;
  width:200px;
  object-fit: cover;
}

#contact .item .text-area .mail {
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  font-style: italic;
}
</style>


