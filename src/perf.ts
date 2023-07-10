export function profile(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]): ReturnType<typeof original> {
    const proto = typeof target === "function" ? target.prototype : target;
    const startTime = Date.now();
    const result = original.apply(this, args);
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.debug(`${proto.constructor.name}.${name} took ${duration}ms`);
    return result;
  };
  return descriptor;
}
