import { Errors } from 'validatorjs';
import { provide, computed, Wrapper } from 'vue-function-api';
import { Newable } from '../models';
import { symbols as storeSymbols } from './base/store';
import { getRules } from './base/validation_rules';
import { useValidation } from './base/validation';
import { Key, inject } from '../utils';

const symbols = {
  formData: new Key<any>(),
  formErrors: new Key<Wrapper<Errors>>(),
};

function useFormManager(formType: Newable<any>) {
  const formData = inject(storeSymbols.getFormData)(formType);
  const { valid, errors } = useValidation(formData, getRules(formType));
  const save = inject(storeSymbols.getSaveFunction)(formType);
  const reset = inject(storeSymbols.reset);

  provide({
    [symbols.formData.symbol]: formData,
    [symbols.formErrors.symbol]: errors,
  });

  return { formName: formType.name, valid, save, reset };
}

function useFormFieldManager(fieldName: string) {
  const formData = inject(symbols.formData);
  const errors = inject(symbols.formErrors);

  const value = computed(
    () => formData[fieldName],
    (val) => {
      formData[fieldName] = val;
    },
  );
  const error = computed(() => errors.value.first(fieldName));

  return { value, error };
}

export { useFormManager, useFormFieldManager };
