import * as log from 'loglevel';
import { Errors } from 'validatorjs';
import { provide, inject, computed, Wrapper } from 'vue-function-api';
import { Newable, NewCustomerForm, NewProductForm } from '../models';
import { symbols as storeSymbols } from './base/store';
import { rules } from './base/validation_rules';
import { useValidation } from './base/validation';

const symbols = {
  formName: Symbol(),
  formErrors: Symbol(),
};

const saves = {
  [NewCustomerForm.name]: storeSymbols.saveCustomer,
  [NewProductForm.name]: storeSymbols.saveProduct,
};

function useFormManager<T>(type: Newable<T>) {
  const formName = type.name;
  log.info(`setting up form logic for: ${formName}`);
  const data = inject(storeSymbols.dataStore) as any;
  const { valid, errors } = useValidation(data.formData[formName], rules[formName]);
  const save = inject(saves[formName]);
  const reset = inject(storeSymbols.reset);

  provide({
    [symbols.formName]: formName,
    [symbols.formErrors]: errors,
  });

  return { formName, valid, save, reset };
}

function useFormFieldManager(fieldName: string) {
  const data = inject(storeSymbols.dataStore) as any;
  const formName = inject(symbols.formName) as unknown as string;
  const errors = inject(symbols.formErrors) as Wrapper<Errors>;

  const value = computed(
    () => data.formData[formName][fieldName],
    (val) => {
      data.formData[formName][fieldName] = val;
    },
  );
  const error = computed(() => errors.value.first(fieldName));

  return { value, error };
}

export { useFormManager, useFormFieldManager };
