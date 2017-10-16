<template>
  <div class="container topmargin" id="app">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Dashboard</div>
                <div class="panel-body">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4">
                        <div class="btn-group">
                            <router-link v-bind:to="'/'">Home</router-link>
                            <button type="button" class="btn btn-primary">Manage Products</button>
                            <button type="button" class="btn btn-success">Checkout</button>
                        </div>
                    </div>
                    <div class="col-md-4">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}
</style>
