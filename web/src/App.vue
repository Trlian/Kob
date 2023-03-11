<template>
  <NavBar />
  <div></div>
  <router-view></router-view>
</template>

<script> 
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import $ from 'jquery'

  export default {
    components: {
      NavBar,
    },
    setup() {
      $.ajax({
        url: "http://localhost:3000/user/account/token/",
        type: "post",
        data: {
          username: 'yxc',
          password: 'pyxc',
        },
        success(resp) {
          console.log(resp);
        },
        error(resp) {
          console.log(resp);
        }
      });

      $.ajax({
        url:  "http://localhost:3000/user/account/info/",
        type: "get",
        headers: {
          Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmZTNhMTNmMTRkODI0MTQ2OWVjMDBlMmU0ZmMzOWViZCIsInN1YiI6IjIiLCJpc3MiOiJzZyIsImlhdCI6MTY3ODUwODQ3MSwiZXhwIjoxNjc5NzE4MDcxfQ.uwNpTmOVPNFvNhMe7tnVeMW7oUjxsdtZPJvbcJjqDBg", 
        },
        success(resp) {
          console.log(resp);
        },
        error(resp) {
          console.log(resp);
        }
      });

      $.ajax({
        url: "http://localhost:3000/user/account/register/",
        type: "post",
        data: {
          username: "yxc3",
          password: "123",
          confirmedPassword: "123",
        },
        success(resp) {
          console.log(resp);
        },
        error(resp) {
          console.log(resp);
        }
      });
    }
  }
</script>



<style>
  body {
    background: url("~@/assets/images/background.png");
    background-size: cover;
  }
</style>
