import * as log from 'loglevel';
import Vue from 'vue';
import { Newable, NewCustomerForm, NewProductForm } from '../../models';

log.info('setting up a global store features...');
const data = Vue.observable({
  formData: {
    [NewCustomerForm.name]: new NewCustomerForm(),
    [NewProductForm.name]: new NewProductForm(),
  },
});

function useStore() {
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

  return { getFormData, getSaveFunction, reset };
}

export { useStore };
