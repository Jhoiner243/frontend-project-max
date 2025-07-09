type Mapper<From, To> = {
  [K in keyof To]: (src: From) => To[K];
};

// 3. Función genérica de adaptación:
export function adapt<From, To>(source: From, mapper: Mapper<From, To>): To {
  const result = {} as To;
  for (const key in mapper) {
    result[key] = mapper[key](source);
  }
  return result;
}
