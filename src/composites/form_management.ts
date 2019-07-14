import { Errors } from 'validatorjs';
import { provide, inject, computed, Wrapper } from 'vue-function-api';
import { Newable } from '../models';
import { symbols as storeSymbols } from './base/store';
import { getRules } from './base/validation_rules';
import { useValidation } from './base/validation';

const symbols = {
  formData: Symbol(),
  formErrors: Symbol(),
};

function getFormData<T>(formType: Newable<T>) {
  return (inject(storeSymbols.getFormData) as Function)(formType);
}

function getSaveFunction<T>(formType: Newable<T>) {
  return (inject(storeSymbols.getSaveFunction) as Function)(formType);
}

function useFormManager<T>(formType: Newable<T>) {
  const { valid, errors } = useValidation(getFormData(formType), getRules(formType));
  const save = getSaveFunction(formType);
  const reset = inject(storeSymbols.reset);

  provide({
    [symbols.formData]: getFormData(formType),
    [symbols.formErrors]: errors,
  });

  return { formName: formType.name, valid, save, reset };
}

function useFormFieldManager(fieldName: string) {
  const formData = inject(symbols.formData) as any;
  const errors = inject(symbols.formErrors) as Wrapper<Errors>;

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
