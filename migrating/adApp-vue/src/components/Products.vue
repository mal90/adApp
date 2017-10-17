<template>
  <div class="container topmargin" id="products">
      <div class="col-md-12">
          <div class="panel panel-info">
            <div class="panel-heading">Products
                <a href="" class="pull-right" >Go To Dashboard</a>
            </div>
                <div class="panel-body">
                    <div class="col-md-6">
                        <form>
                            <div class="form-group">
                                <label for="id">ID*:</label>
                                <input type="text" class="form-control" id="id" name="id">
                            </div>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" id="name" name="name">
                            </div>
                            <div class="form-group">
                                <label for="price">Price $:</label>
                                <input type="text" class="form-control" id="price" name="price">
                            </div>
                            <div>
                                <button type="submit" class="btn btn-success">Add/Update product</button>
                                <button class="btn btn-warning pull-right">Clear</button>
                            </div>                           
                        </form>
                        <button v-on:click="get">Call Server</button>
                    </div>
                    <div class="col-md-6">
                        <div class="list-table">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{  }}</td>
                                    <td>{{  }}</td>
                                    <td>${{  }}</td>
                                    <td><a href="#" class="btn btn-primary" >Edit</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>    
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  methods: {
        get: function() {
            // GET request
            this.$http({
                url: '/products',
                method: 'GET'
            }).then(function(response) {
                console.log('ok');
            }, function(response) {
                console.log('failed');
            });
        }
    }
}

</script>

<style>
.topmargin
{
   margin-top: 50px;
}
.list-table
{
   max-height: 250px;
   overflow-y: scroll;
}        
</style>
