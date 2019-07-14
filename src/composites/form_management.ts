import { Errors } from 'validatorjs';
import { provide, inject, computed, Wrapper } from 'vue-function-api';
import { Newable, NewCustomerForm, NewProductForm } from '../models';
import { symbols as storeSymbols } from './base/store';
import { getRules } from './base/validation_rules';
import { useValidation } from './base/validation';

const symbols = {
  formData: Symbol(),
  formErrors: Symbol(),
};

const saves = {
  [NewCustomerForm.name]: storeSymbols.saveCustomer,
  [NewProductForm.name]: storeSymbols.saveProduct,
};

function getFormData<T>(type: Newable<T>) {
  return (inject(storeSymbols.getFormData) as Function)(type);
}

function useFormManager<T>(type: Newable<T>) {
  const formName = type.name;
  const { valid, errors } = useValidation(getFormData(type), getRules(type));
  const save = inject(saves[formName]);
  const reset = inject(storeSymbols.reset);

  provide({
    [symbols.formData]: getFormData(type),
    [symbols.formErrors]: errors,
  });

  return { formName, valid, save, reset };
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
