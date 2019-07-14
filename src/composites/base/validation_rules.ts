import { Rules } from 'validatorjs';
import { Newable, NewCustomerForm, NewProductForm } from '../../models';

interface ModelRules {
  [name: string] : Rules
}

const rules: ModelRules = {
  [NewCustomerForm.name]: {
    firstName: 'required|alpha|between:3,16',
    lastName: 'required|alpha|between:3,16',
    address: 'between:6,128',
    phoneNum: 'digits:10',
    email: 'required|email',
  },
  [NewProductForm.name]: {
    name: 'required|between:3,24',
    description: 'required|between:6,64',
    productCode: 'required|digits:8',
    price: 'required|numeric',
  },
};

const getRules = <T>(type: Newable<T>) => rules[type.name];

export { getRules };
