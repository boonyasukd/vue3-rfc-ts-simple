<template>
  <div class="form-group">
    <label :for="fieldName">{{ label }}</label>
    <input
      :id="fieldName"
      class="form-control"
      :class="{ 'is-invalid': error }"
      type="text"
      v-model="value"
    >
    <span class="invalid-feedback">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { createComponent } from 'vue-function-api';
import { useFormFieldManager } from '../composites/form_management';

interface Props { fieldName: string, label: string }

export default createComponent({
  // props declaration hack; this line will be unnecessary when Vue 3 is out
  props: ['fieldName', 'label'] as unknown as Props,
  setup({ fieldName, label }) {
    const { value, error } = useFormFieldManager(fieldName.toString());
    return { fieldName, label, value, error };
  },
});
</script>
