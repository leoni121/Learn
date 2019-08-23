/**
 * 使用方式：
 * 1.
 * while ((N=readInt()) != null && (M=readInt()) != null) {
    print (N + ' ' + M);
    let arr = [];
    for (let i=0; i<M; i++) {
      for(let j = 0;j<3;j++) {
        arr.push(readInt());
      }
      print(...arr);
      arr = [];
    }
  }

  2.
   let line;
   while ((line = read_line())) {
    [N, M] = line.split(" ");
    print (N + ' ' + M);
    let arr = [];
    for (let i=0; i<M; i++) {
      let _line = read_line();
      print(..._line.split(" "));
      arr = [];
    }
  }
 */
