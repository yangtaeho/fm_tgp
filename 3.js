const std = {
  fill: (first, last, v)=>{
    let res = [];
    for (let i = 0; i < last; i ++) {
      res.push(i<first?undefined:v);
    }
    return res;
  },
  generate: (first, last, g)=>{
    let res = [], i = 0;
    while (first < last) {
      res[i++] = first;
      console.log('generate first, last -> ', first, last);
      first = g(first);
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
const getSieves = (nums, flags)=>{
  let i = 0;
  return flags.reduce((r, v)=>{
    v && r.push(nums[i]);
    i++;
    return r;
  }, []).join(', ');
};
(()=>{ //test
  const nums = std.generate(1, 13, v=>++v);
  let flags = std.fill(nums[0], nums[nums.length - 1], true);
  mark_sieve(nums[0], nums[nums.length - 1], 2, flags);
  mark_sieve(nums[0], nums[nums.length - 1], 3, flags);
  console.log(getSieves(nums, flags));
  console.log('\n', nums, '\n', flags);
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
    if (first[i]) {     // 해당 수가 소수인 경우
      mark_sieve(first + index_square, last, factor);
    }
    ++i;
    index_square += factor;
    factor += Number(2);
    index_square += factor;
  }
}