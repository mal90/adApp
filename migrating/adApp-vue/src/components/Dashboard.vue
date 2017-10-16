<template>
  <div class="container topmargin" id="dashboard">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Dashboard</div>
                <div class="panel-body">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4">
                        <div class="btn-group">
                            <router-link type="button" class="btn btn-primary" v-bind:to="'/'">Home</router-link>
                            <router-link type="button" class="btn btn-success" v-bind:to="'/products'">Products</router-link>
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
  name: 'Dashboard'
}
</script>