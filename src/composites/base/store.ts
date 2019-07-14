import * as log from 'loglevel';
import { state, provide } from 'vue-function-api';
import { Form, SymbolLookup, NewCustomerForm, NewProductForm } from '../../models';

const symbols = {
  dataStore: Symbol(),
  saveCustomer: Symbol(),
  saveProduct: Symbol(),
  reset: Symbol(),
} as SymbolLookup;

interface StoreModel {
  formData: {
    [formName: string]: Form,
  }
}

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
  } as StoreModel);
  const saveCustomer = () => {
    log.info(`saving a customer:\n${JSON.stringify(data.formData.NewCustomerForm)}`);
    // reset formData
    data.formData[NewCustomerForm.name] = {
      firstName: null,
      lastName: null,
      address: null,
      phoneNum: null,
      email: null,
    };
  };
  const saveProduct = () => {
    log.info(`saving a product:\n${JSON.stringify(data.formData.NewProductForm)}`);
    // reset formData
    data.formData[NewProductForm.name] = {
      name: null,
      description: null,
      productCode: null,
      price: null,
    };
  };
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

  provide({
    [symbols.dataStore]: data,
    [symbols.saveCustomer]: saveCustomer,
    [symbols.saveProduct]: saveProduct,
    [symbols.reset]: reset,
  });

  return {};
}

export { useStore, symbols, StoreModel };
