export function xor<A, B>(a: A, b: B) {
  return (a || b) && !(a && b);
}
