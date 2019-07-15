import * as log from 'loglevel';
import { state, provide } from 'vue-function-api';
import { Newable, Form, NewCustomerForm, NewProductForm } from '../../models';
import { Key } from '../../utils';

const symbols = {
  getFormData: new Key<(_: Newable<any>) => Form>(),
  getSaveFunction: new Key<(_: Newable<any>) => () => void>(),
  reset: new Key<() => void>(),
};

function useStore() {
  log.info('setting up a global store...');

  const data = state({
    formData: {
      [NewCustomerForm.name]: new NewCustomerForm(),
      [NewProductForm.name]: new NewProductForm(),
    },
  });

  function getFormData(formType: Newable<any>) { return data.formData[formType.name]; }

  function saveCustomer() {
    log.info(`saving a customer:\n${JSON.stringify(data.formData.NewCustomerForm)}`);
    reset(); // fake save; do reset instead
  }

  function saveProduct() {
    log.info(`saving a product:\n${JSON.stringify(data.formData.NewProductForm)}`);
    reset(); // fake save; do reset instead
  }

  function getSaveFunction(formType: Newable<any>) {
    switch (formType.name) {
      case NewCustomerForm.name:
        return saveCustomer;
      case NewProductForm.name:
        return saveProduct;
      default:
        throw Error(`Unsupported form model: ${formType.name}`);
    }
  }

  function reset() {
    data.formData[NewCustomerForm.name] = new NewCustomerForm();
    data.formData[NewProductForm.name] = new NewProductForm();
  }

  provide({
    [symbols.getFormData.symbol]: getFormData,
    [symbols.getSaveFunction.symbol]: getSaveFunction,
    [symbols.reset.symbol]: reset,
  });

  return {};
}

export { useStore, symbols };
