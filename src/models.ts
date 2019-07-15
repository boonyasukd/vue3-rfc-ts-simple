type Newable<T> = { new (...args: any[]): T; };

interface Form {}

class NewCustomerForm implements Form {
  constructor(
    public firstName: string | null = null,
    public lastName: string | null = null,
    public address: string | null = null,
    public phoneNum: string | null = null,
    public email: string | null = null,
  ) {}
}

class NewProductForm implements Form {
  constructor(
    public name: string | null = null,
    public description: string | null = null,
    public productCode: string | null = null,
    public price: number | null = null,
  ) {}
}

export { Newable, Form, NewCustomerForm, NewProductForm };
