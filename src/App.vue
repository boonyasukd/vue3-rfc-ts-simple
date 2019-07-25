<template>
  <div id="app">
    <div class="center-heading">
      <img src="./assets/logo.png">
      <h3>
        <code>function-based api</code> demo
      </h3>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          <div class="card">
            <NewCustomerForm/>
            <NewProductForm/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NewCustomerForm from './components/NewCustomerForm.vue';
import NewProductForm from './components/NewProductForm.vue';

export default {
  components: { NewCustomerForm, NewProductForm },
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css';

.form-title {
  margin-bottom: 11px;
}
.center-heading {
  text-align: center;
  padding: 10px 0;
}
.center-heading img {
  width: 90px;
}
</style>
