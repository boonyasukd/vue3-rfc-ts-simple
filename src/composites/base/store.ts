import * as log from 'loglevel';
import { state, provide } from 'vue-function-api';
import { Newable, NewCustomerForm, NewProductForm } from '../../models';

const symbols = {
  getFormData: Symbol(),
  getSaveFunction: Symbol(),
  reset: Symbol(),
};

function useStore() {
  log.info('setting up a global store...');

  const data = state({
    formData: {
      [NewCustomerForm.name]: {
        firstName: null,
        lastName: null,
        address: null,
        phoneNum: null,
        email: null,
      },
      [NewProductForm.name]: {
        name: null,
        description: null,
        productCode: null,
        price: null,
      },
    },
  });
  const getFormData = <T>(formType: Newable<T>) => data.formData[formType.name];
  const reset = () => {
    data.formData[NewCustomerForm.name] = {
      firstName: null,
      lastName: null,
      address: null,
      phoneNum: null,
      email: null,
    };
    data.formData[NewProductForm.name] = {
      name: null,
      description: null,
      productCode: null,
      price: null,
    };
  };
  const saveCustomer = () => {
    log.info(`saving a customer:\n${JSON.stringify(data.formData.NewCustomerForm)}`);
    reset(); // fake save; do reset instead
  };
  const saveProduct = () => {
    log.info(`saving a product:\n${JSON.stringify(data.formData.NewProductForm)}`);
    reset(); // fake save; do reset instead
  };
  const getSaveFunction = <T>(formType: Newable<T>) => {
    switch (formType.name) {
      case NewCustomerForm.name:
        return saveCustomer;
      case NewProductForm.name:
        return saveProduct;
      default:
        throw Error(`Unsupported form model: ${formType.name}`);
    }
  };

  provide({
    [symbols.getFormData]: getFormData,
    [symbols.getSaveFunction]: getSaveFunction,
    [symbols.reset]: reset,
  });

  return {};
}

export { useStore, symbols };
