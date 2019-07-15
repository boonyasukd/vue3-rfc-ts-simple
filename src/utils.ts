import { inject as vueInject } from 'vue-function-api';

// temporary until new version of vue-function-api is released

// class for piggybacking type T onto symbol
class Key<T> {
  constructor(
    public symbol: symbol = Symbol(),
  ) {}
}

// inject function that automatically cast to appropriate type
const inject = <T>(key: Key<T>) => vueInject(key.symbol) as T;

export { Key, inject };
