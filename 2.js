// 공통 ==================

const odd = (n) => n & 0x1;
const half = (n) => n >> 1;


// 2-1 ==================

const multiply0 = (n, a) => {
    if (n ==1) return a;
    return multiply0(n -1, a) + a;
};
const multiply1 = (n, a) => {
    if (n ==1) return a;
    let result = multiply1(half(n), a + a);
    if (odd(n)) result = result + a;
    return result;
};

const multiply_by_15 = (a) => {
    const b = (a + a) + a;
    const c = b + b;
    return (c + c) + b;
};


// 2-1 ==================

const mult_acc0 = (r, n, a) => {
    if (n == 1) return r + a;
    if (odd(n)) {
        return mult_acc0(r + a, half(n), a + a);
    } else {
        return mult_acc0(r, half(n), a + a);
    }
};
const mult_acc1 = (r, n, a) => {
    if (n == 1) return r + a;
    if (odd(n)) r = r + a;
    return mult_acc1(r, half(n), a + a);
};
const mult_acc2 = (r, n, a) => {
    if (odd(n)) {
        r = r + a;
        if (n == 1) return r;
    }
    return mult_acc2(r, half(n), a + a);
};
const mult_acc3 = (r, n, a) => {
    if (odd(n)) {
        r = r + a;
        if (n == 1) return r;
    }
    n = half(n);
    a = a + a;
    return mult_acc3(r, n, a);
};
const mult_acc4 = (r, n, a) => {
    while (true) {
        if (odd(n)) {
            r = r + a;
            if (n == 1) return r;
        }
        n = half(n);
        a = a + a;
    }
};
const multiply2 = (n, a) => {
    if (n ==1) return a;
    return mult_acc4(a , n -1, a);
};
const multiply3 = (n, a) => {
    while (!odd(n)) {
        a = a + a;
        n = half(n);
    }
    if (n ==1) return a;
    return mult_acc4(a , n -1, a);
};
const multiply4 = (n, a) => {
    while (!odd(n)) {
        a = a + a;
        n = half(n);
    }
    if (n ==1) return a;
    // even(n - 1) -> n - 1 != 1
    return mult_acc4(a , half(n - 1), a + a);
};