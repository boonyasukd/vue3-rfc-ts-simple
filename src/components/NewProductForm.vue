<template>
  <div class="card-body">
    <h5 class="form-title">New Product</h5>
    <form :id="formName">
      <FormItem fieldName="name" label="Name"/>
      <FormItem fieldName="description" label="Description"/>
      <FormItem fieldName="productCode" label="ProductCode"/>
      <FormItem fieldName="price" label="Price"/>

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
import { NewProductForm } from '../models';

import FormItem from './FormItem.vue';

export default createComponent({
  setup() {
    const { formName, valid, save, reset } = useFormManager(NewProductForm);
    return { formName, valid, save, reset };
  },
  components: { FormItem },
});
</script>
