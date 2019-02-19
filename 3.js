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
// const getIdx = (first, list)=>{for ( var v of list.entries() ) if (v[1] == first) return v[0];}
const getSieves = (flags)=>{
  let i = 0;
  return flags.reduce((r, v)=>{
    v && r.push(2*i+3);
    i++;
    return r;
  }, []).join(', ');
};
const getSievesEx = (flags, nums)=>{
  let i = 0;
  return flags.reduce((r, v)=>{
    v && r.push(2*i+3);
    i++;
    return r;
  }, []).join(', ');
};
(()=>{ //test
  let flags = std.fill(0, 81, true);
  //const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
// const nums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98]
//     .filter(v=> v != 2 && v%2 != 0);
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81];
  mark_sieve(4, 81, 2, flags, nums);
  mark_sieve(9, 81, 3, flags, nums);
  mark_sieve(10, 81, 5, flags, nums);
  mark_sieve(49, 81, 7, flags, nums);
  // mark_sieve(4, 81, 2, flags, nums);
  // mark_sieve(9, 81, 3, flags, nums);
  // mark_sieve(12, 81, 5, flags, nums);
  // mark_sieve(24, 81, 7, flags, nums);
  // mark_sieve(40, 81, 9, flags, nums);
  // 1 		 12 99 5
  // 2 		 24 99 7
  // 3 		 40 99 9
  // 4 		 60 99 11
  // 5 		 84 99 13
  console.log('테스트', '\n', flags, '\n', getSieves(flags));
  // console.log('테스트', '\n', flags, '\n', getSievesEx(flags, nums));
})();

/**
 * 
 * @param {*} first 작업을 시작할 위치
 * @param {*} n 
 * @param {*} flags 
 * @param {*} nums 
 */
const sift0 = (first, n, nums)=>{
  //console.log('debug flags 1', '\n', flags);
  //std.fill(first, first + n, true);
  let flags = std.fill(first, first + n, true);
  let i = 0;
  let index_square = 3;
  while (index_square < n) {
    // index_square = 2i^2 + 6i + 3으로 고정
    // console.log('debug', i, flags[i], nums[i], index_square < n, index_square, n);
    if (flags[i]) {         // 해당 수가 소수인 경우
      console.log('debug', i, '\t\t', first + index_square, first + n, i + i + 3);
      mark_sieve(first + index_square,
              first + n,    // last
              i + i + 3,    // factor
              flags, nums);
    }
    ++i;
    index_square = 2*i*(i + 3) + 3;
    // console.log('debug', 'i', i, 'nums[i]', nums[i], 'flags[i]', flags[i], '_first', first, 'index_square', index_square);
  }
  // console.log('debug flags 2', '\n', flags);
  return flags; // 추가함...
};
(()=>{
  // // let flags = std.fill(0, 80, true);
  // // const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
  // const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81];
  // // sift0(0, 81, flags, nums);
  // let flags = sift0(0, 81, nums);
  // console.log('테스트 2', '\n', getSieves(flags));
  // // console.log('테스트 2', '\n', getSievesEx(flags, nums));

  // https://gist.github.com/haneulai/b3b02e055b7b8314c9430355549b3301
  // 호스트 코드 참조..
  first = 0
  n = 10000
  arr = sift0(first, n)
  arr2 = []
  i = first
  for (b of arr) {
    if (b) { 
      arr2.push(2*i + 3)
      }
    i++;
  }
  console.log('sift0',arr2)
})();


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


// 3.4
// class line_segment {

// }
// line_segment gcm = (line_segment a, line_segment b) => {}
// const gcm = (a, b) => {
//   if (a==b) return a;
//   if (b < a) return gcm(a - b, b);
//   /* if (a < b)  */ return gcm(a, b - a);
// };
// line segment 가 끝없이 들어가게 된다.


