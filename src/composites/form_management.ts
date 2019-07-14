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

function getFormData<T>(type: Newable<T>) {
  return (inject(storeSymbols.getFormData) as Function)(type);
}

function getSaveFunction<T>(type: Newable<T>) {
  return (inject(storeSymbols.getSaveFunction) as Function)(type);
}

function useFormManager<T>(type: Newable<T>) {
  const { valid, errors } = useValidation(getFormData(type), getRules(type));
  const save = getSaveFunction(type);
  const reset = inject(storeSymbols.reset);

  provide({
    [symbols.formData]: getFormData(type),
    [symbols.formErrors]: errors,
  });

  return { formName: type.name, valid, save, reset };
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
