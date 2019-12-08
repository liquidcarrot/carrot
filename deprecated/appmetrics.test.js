function factorial(n) {
  if(n < 2) return 1;
  else return n * factorial(--n);
}

for(let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
  factorial(170);
}
