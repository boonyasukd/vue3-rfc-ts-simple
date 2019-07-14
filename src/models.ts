type Newable<T> = { new (...args: any[]): T; };

class NewCustomerForm {
  constructor(
    public firstName: string | null,
    public lastName: string | null,
    public address: string | null,
    public phoneNum: string | null,
    public email: string | null,
  ) {}
}

class NewProductForm {
  constructor(
    public name: string | null,
    public description: string | null,
    public productCode: string | null,
    public price: number | null,
  ) {}
}

export { Newable, NewCustomerForm, NewProductForm };
