import { Errors } from 'validatorjs';
import { provide, computed, Wrapper } from 'vue-function-api';
import { Newable } from '../models';
import { useStore } from './base/store';
import { getRules } from './base/validation_rules';
import { useValidation } from './base/validation';
import { Key, inject } from '../utils';

const symbols = {
  formData: Symbol() as Key<any>,
  formErrors: Symbol() as Key<Wrapper<Errors>>,
};

function useFormManager(formType: Newable<any>) {
  const { getFormData, getSaveFunction, reset } = useStore();

  const save = getSaveFunction(formType);
  const formData = getFormData(formType);
  const { valid, errors } = useValidation(formData, getRules(formType));

  provide({
    [symbols.formData as symbol]: formData,
    [symbols.formErrors as symbol]: errors,
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
