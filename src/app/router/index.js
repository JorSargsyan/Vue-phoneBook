import Vue from 'vue'
import Router from 'vue-router'
import ContactList from "../components/ContactList.vue"
import CreateContact from "../components/CreateContact.vue"
import ContactDetails from "../components/ContactDetails.vue"
import EditContact from "../components/EditContact.vue"
import Call from "../components/Call"

Vue.use(Router)

export default new Router({
  mode : "history",
  routes: [
    {
      path: '/contactslist',
      component: ContactList
    },
    {
      path : "/",
      redirect : "/contactslist"
    },
    {
      path : "/newcontact",
      component: CreateContact
    },
     {
      path : "/contact/:id",
      component: ContactDetails,
        props: true
     },
     {
       path: "/contact/:id/edit",
       props:true,
       component : EditContact
     },
     {
       path: "/call",
      component: Call
     }
  ]
})
