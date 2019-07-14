type Newable<T> = { new (...args: any[]): T; };

interface SymbolLookup {
  [formName: string]: symbol
}

interface Form {
  [fieldName: string]: any
}

class NewCustomerForm implements Form {
  constructor(
    public firstName: string | null,
    public lastName: string | null,
    public address: string | null,
    public phoneNum: string | null,
    public email: string | null,
  ) {}
}

class NewProductForm implements Form {
  constructor(
    public name: string | null,
    public description: string | null,
    public productCode: string | null,
    public price: number | null,
  ) {}
}

export { Newable, SymbolLookup, Form, NewCustomerForm, NewProductForm };
