const std = {
  fill: (first, last, v)=>{
    let res = [];
    for (let i = 0; i < last; i ++) {
      res.push(i<first?undefined:v);
    }
    return res;
  }
};

const mark_sieve = (first, last, factor, res = [])=>{
  // assert(first != last)
  //*first = false;
  res[first] = false;
  while (last - first > factor) {
    first = first + factor;
    //*first = false;
    res[first] = false;
  }
};
(()=>{ //test
  const res = std.fill(0, 99, true);
  mark_sieve(0,99,3,res)
})();


const my_ratio = (x, y)=>{
  // assert(y != 0.0);
  return x /y ;
};


















const sift0 = (_first, n, res = [])=>{
  const flags = std.fill(_first, _first + n, true);
  //std.fill(_first, _first + n, true);
  let i = 0;
  let index_square = 3;
  while (index_square < n) {
    // index_square = 2i^2 + 6i + 3으로 고정
    if (flags[i]) {
      mark_sieve(res[i] + index_square,
          res[i] + n,
          i + i + 3, res);
    }
    ++i;
    index_square = 2*i*(i + 3) + 3;
  }
};


const sift1 = (_first, n)=>{
  let last = first + n;
  std.fill(first, last, true);
  let i = 0;
  let index_square = 3;
  let factor = 3;
  while (index_square < n) {
    // index_square = 2i^2 + 6i + 3으로 고정
    if (first[i]) {
      mark_sieve(first + index_square,
          last,
          factor, first);
    }
    ++i;
    factor = i + i + 3;
    index_square = 2*i*(i + 3) + 3;
  }
};


const sift = (first, n)=>{
  let last = first + n;
  std.fill(first, last, true);
  let i = 0;
  let index_square = 3;
  let factor = 3;
  while (index_square < n) {
    // index_square = 2i^2 + 6i + 3으로 고정
    // factor = 2i + 3으로 고정
    
  }
}