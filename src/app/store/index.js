import vuex from "vuex"
import vue from "vue"
import Axios from "axios"
import { stat } from "fs";



vue.use(vuex);

const state = {
    contactItems: [],
}


const actions = {
    getContactsList({commit}){
        Axios.get("/api/contacts").then((response)=>{
            commit("UPDATE_CONTACTS",response.data)
        })
    },
    deleteContact({commit},item){
        Axios.post("/api/delete",item).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    submitForm({commit},formData){
        Axios.post("/api/contacts",formData).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    addEmail({commit},json){
        Axios.post("/api/addemail",json).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    addNumber({commit},json){
        Axios.post("/api/addnumber",json).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    deleteEmail({commit},json){  
        Axios.post("/api/deleteeMail",json).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    updateEmail({commit},json){
        Axios.post("/api/updateemail",json).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    deleteNumber({commit},json){
        Axios.post("/api/deletenumber",json).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    updateNumber({commit},json){
        Axios.post("/api/updateNumber",json).then((res)=>{
            commit("UPDATE_CONTACTS",res.data);
        })
    },
    uploadPhoto({commit},json){
        const formData = new FormData();
        formData.append("avatar",json.file);
        formData.append("id",json.id)
        Axios.post("/api/uploadpic",formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
          return commit("UPDATE_CONTACTS",res.data);
          })
          .catch(function(){
            console.log('FAILURE!!');
         });
    }
}


const mutations = {
    UPDATE_CONTACTS(state,payload){
        state.contactItems = payload;
    }
}


const getters = {
 getContacts : state => state.contactItems,
 ContactItemFromID : (state) => (id) => {
    return state.contactItems.find(contactItem => contactItem.id === id);
},
EmailsList :(state) =>(id) => {
    return state.contactItems.find(contactItem => contactItem.id === id).emails;
},
NumbersList : (state) => (id) =>{
    return state.contactItems.find(contactItem => contactItem.id === id).numbers;
}
}


const ContactModule = {
    state,
    mutations,
    actions,
    getters
}


export default new vuex.Store({
    modules: {
        ContactModule
    }
}) 