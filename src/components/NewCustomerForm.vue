<template>
  <div class="card-body">
    <h5 class="form-title">New Customer</h5>
    <form :id="formName">
      <FormItem fieldName="firstName" label="First Name"/>
      <FormItem fieldName="lastName" label="Last Name"/>
      <FormItem fieldName="address" label="Address"/>
      <FormItem fieldName="phoneNum" label="Phone"/>
      <FormItem fieldName="email" label="Email"/>

      <div>
        <button class="btn btn-primary" :disabled="!valid" @click="save">Save</button>
        <span>&nbsp;</span>
        <button class="btn btn-primary" @click="reset">Reset</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { createComponent } from 'vue-function-api';
import { useFormManager } from '../composites/form_management';
import { NewCustomerForm } from '../models';

import FormItem from './FormItem.vue';

export default createComponent({
  setup() {
    const { formName, valid, save, reset } = useFormManager(NewCustomerForm);
    return { formName, valid, save, reset };
  },
  components: { FormItem },
});
</script>
