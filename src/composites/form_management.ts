import * as log from 'loglevel';
import { paramCase } from 'change-case';
import { provide, inject, computed, Wrapper } from 'vue-function-api';
import { Errors } from 'validatorjs';
import { Newable, SymbolLookup, Form, NewCustomerForm, NewProductForm } from '../models';
import { symbols as storeSymbols, StoreModel } from './base/store';
import { rules } from './base/validation_rules';
import { useValidation } from './base/validation';

const symbols = {
  formName: Symbol(),
  formErrors: Symbol(),
} as SymbolLookup;

const saves = {
  [NewCustomerForm.name]: storeSymbols.saveCustomer,
  [NewProductForm.name]: storeSymbols.saveProduct,
} as SymbolLookup;

function useFormManager<T extends Form>(type: Newable<T>) {
  const formName = type.name;
  log.info(`setting up form logic for: ${formName}`);
  const data = inject(storeSymbols.dataStore) as StoreModel;
  const { valid, errors } = useValidation(data.formData[formName], rules[formName]);
  const save = inject(saves[formName]) as Function;
  const reset = inject(storeSymbols.reset) as Function;

  provide({
    [symbols.formName]: formName,
    [symbols.formErrors]: errors,
  });

  return { formName: paramCase(formName), valid, save, reset };
}

function useFormFieldManager(fieldName: string) {
  const data = inject(storeSymbols.dataStore) as StoreModel;
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
