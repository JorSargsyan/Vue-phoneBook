<template>
   <div id="contactList">
      <v-text-field
            label="Search In your Contacts"
            prepend-icon="search"
            v-model="search"
      ></v-text-field>
   <div v-for="item in filteredBlock" :key="item.id">
       <ContactItem :item=item ></ContactItem>
   </div>
   </div>
</template>


<script>
import ContactItem from "./ContactItem"
import { mapGetters } from "vuex";

export default {
  name: "ContactList",
  data(){
    return{
       search : ""
    }
  },
  components: {
      ContactItem
  },
   computed : {
        ...mapGetters([
            "getContacts"
        ]),
        filteredBlock(){
          return this.$store.getters.getContacts.filter((item)=>{
            return item.name.toLowerCase().match(this.search.toLowerCase());
          })
        }
    }
};
</script>


<style  >
#contactList .item {
  background: #424242;
  border: 1px solid #4f4f4f;
  box-shadow: 0 0 4px 4px #0000000a;
  display: flex;
  padding: 20px 20px;
  justify-content: space-between;
}

.v-card__title.headline{
  justify-content: center;
}

#contactList .item .text-area {
  flex: 4;
  padding-top: 20px;
  text-align: justify;
}

#contactList .item .img-area {
  flex: 2;
}

#contactList .item .navig-area {
  flex: 4;
  padding-top: 27px;
  display: flex;
  justify-content: flex-end;
}

#contactList .item .text-area .name {
  font-size: 16px;
  font-weight: 600;
}

#contactList .item .img-area .image {
  border-radius: 50%;
  height: 100px;
  border: 3px solid white;
  width: 100px;
  object-fit: cover;
}

#contactList .item .text-area .mail {
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  font-style: italic;
}

@media screen and (max-width:576px){
  #contactList .item{
    flex-direction: column;
  }

  #contactList .item .navig-area{
    flex-wrap: wrap;
  }
}
</style>
