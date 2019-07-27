<template>
  <div id="app">
 <v-app   id="inspire" dark>
  <div class="progress-bar-bg" v-show="this.progressShowed">
    <v-progress-circular
      :width="4"
      color="white"
      indeterminate
    ></v-progress-circular>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/contactslist">Contacts List</router-link> </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>create</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/newContact"> Create New Contact</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-list-tile >
          <v-list-tile-action>
            <v-icon>call</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/call"> Call Center</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Phonebook </v-toolbar-title>
  

    </v-toolbar>
   
       
   
    <v-content>
      <v-container fluid >
        <router-view v-on:progressOn="progressBar($event)"></router-view>
      </v-container>
    </v-content>
   
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
  </div>
  
</template>

<script>

export default {
  name: "App",
  data: () => ({
    drawer: true,
    progressShowed: false
  }),
  props: {
    source: String
  },
  methods:{
     progressBar(param) {
       if(param){
          return  this.progressShowed = true;
       }
       else{
         return  this.progressShowed = false;
       }
      }
  },
  created() {
    this.$store.dispatch("getContactsList");
  }
};
</script>

<style>
* {
  font-family: "Questrial", sans-serif;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.v-progress-circular {
  margin: 1rem;
  position: absolute;
  display: block;
  top: calc(50vh - 32px);
  left: calc(50vw - 32px);
}
.progress-bar-bg {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: #00000091;
  z-index: 9999999;
}

.v-progress-circular {
  position: fixed;
  right: 30px;
  display: block;
}

* {
  letter-spacing: 1px;
}
a {
  text-decoration: none !important;
  color: inherit !important;
}
</style>
