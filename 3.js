const std = {
  fill: (first, last, v)=>{
    let res = [];
    for (let i = 0; i < last; i ++) {
      // res.push(i<first?undefined:v);
      res.push(i<first?!v:v);
      // res.push(v);
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

/**
 * 
 * @param {*} first factor 의 배수 중에서 아직 지워지지 않은 첫 번째 배수에 해당하는 불 값을 가리킴 
 * @param {*} last stl 관행에 따라 우리가 사용할 표에 들어있는 마지막 원소 바로 다음 위치를 가리키는 반복자
 * @param {*} factor  지금 처리할 소수 인수
 * @param {*} res 책과 달리 c++ 같이 메모리 참조를 하지 않고 처리된 값이 저장된 배열을 넘겨줌
 * **** last - first 가 원소의 갯수
 */
const mark_sieve = (first, last, factor, flags = [])=>{
  // assert(first != last)
  //*first = false;
  flags[first] = false;
  while (last - first > factor) {
    first = first + factor;
    //*first = false;
    flags[first] = false;
  }
};

// 테스트용 함수
const getSieves = (flags)=>{
  let i = 0;
  return flags.reduce((r, v)=>{
    v && r.push(2*i+3);
    i++;
    return r;
  }, []).join(', ');
};
(()=>{ //test
  let flags = std.fill(0, 81, true);
  mark_sieve(3, 81, 3, flags);
  mark_sieve(11, 81, 5, flags);
  mark_sieve(23, 81, 7, flags);
  mark_sieve(59, 81, 9, flags);
  console.log('테스트 mark_sieve', '\n', getSieves(flags));
})();

/**
 * 
 * @param {*} first 작업을 시작할 위치
 * @param {*} n 테이블의 크기
 */
const sift0 = (first, n)=>{
  //console.log('debug flags 1', '\n', flags);
  //std.fill(first, first + n, true);
  let flags = std.fill(first, first + n, true);
  let i = 0;
  let index_square = 3;
  while (index_square < n) {
    // index_square = 2i^2 + 6i + 3으로 고정
    // console.log('debug', i, flags[i], index_square < n, index_square, n);
    if (flags[i]) {         // 해당 수가 소수인 경우
      console.log('debug', i, '\t\t', first + index_square, first + n, i + i + 3);
      mark_sieve(first + index_square,
              first + n,    // last
              i + i + 3,    // factor
              flags);
    }
    ++i;
    index_square = 2*i*(i + 3) + 3;
    // console.log('debug', 'i', i, 'nums[i]', nums[i], 'flags[i]', flags[i], '_first', first, 'index_square', index_square);
  }
  // console.log('debug flags 2', '\n', flags);
  return flags; // 추가함...
};
(()=>{
  let flags = sift0(0, 81);
  console.log('테스트 sift0', '\n', getSieves(flags));

  // https://gist.github.com/haneulai/b3b02e055b7b8314c9430355549b3301
  // 호스트 코드 참조..
  // first = 0
  // n = 10000
  // arr = sift0(first, n)
  // arr2 = []
  // i = first
  // for (b of arr) {
  //   if (b) { 
  //     arr2.push(2*i + 3)
  //     }
  //   i++;
  // }
  // console.log('sift0',arr2)
})();


const sift1 = (first, n)=>{
  let last = first + n;
  let flags = std.fill(first, last, true);
  let i = 0;
  let index_square = 3;
  let factor = 3;
  while (index_square < n) {
    // index_square = 2i^2 + 6i + 3으로 고정
    if (flags[i]) {
      mark_sieve(first + index_square, last, factor, flags);
    }
    ++i;
    factor = i + i + 3;
    index_square = 2*i*(i + 3) + 3;
  }
  return flags; // 추가함...
};
(()=>{
  let flags = sift1(0, 81);
  console.log('테스트 sift1', '\n', getSieves(flags));
})();


const sift = (first, n)=>{
  let last = first + n;
  let flags = std.fill(first, last, true);
  let i = 0;
  let index_square = 3;
  let factor = 3;
  while (index_square < n) {
    // index_square = 2i^2 + 6i + 3으로 고정
    // factor = 2i + 3으로 고정
    if (flags[i]) {     // 해당 수가 소수인 경우
      mark_sieve(first + index_square, last, factor, flags);
    }
    ++i;
    index_square += factor;
    factor += 2;
    index_square += factor;
  }
  return flags; // 추가함...
};
(()=>{
  let flags = sift(0, 81);
  console.log('테스트 sift', '\n', getSieves(flags));
})();


// 3.4
// class line_segment {

// }
// line_segment gcm = (line_segment a, line_segment b) => {}
const gcm = (a, b,step = 0) => {
  console.log('debug step ==>', step, a, b);
  if (a==b) return console.log('last step ==>', ++step), a;
  if (b < a) return gcm(a - b, b, ++step);
  /* if (a < b)  */ return gcm(a, b - a, ++step);
};
// line segment 가 끝없이 들어가게 된다.
console.log('gcm',gcm(128,64));
console.log('gcm',gcm(16,64));
console.log('gcm',gcm(151,157));
// console.log('gcm',gcm(16,65535)); //느리다..
// console.log('gcm',gcm(16,65536));
console.log('gcm',gcm(256,65536));


