const ATREE = [
  {"id": "1", "name": "动物", "pid": "0"},
  {"id": "2", "name": "鸟类", "pid": "5"},
  {"id": "3", "name": "无脊椎动物", "pid": "1"},
  {"id": "4", "name": "哺乳动物", "pid": "5"},
  {"id": "5", "name": "脊椎动物", "pid": "1"},
  {"id": "6", "name": "喜鹊", "pid": "2"},
  {"id": "7", "name": "蚯蚓", "pid": "3"}
];


function createDomMenuTree(id = "0") {
  let temArr = [];
  let menuStr = "";
  for (let item of ATREE) {
    if (item.pid === id) {
      temArr.push(item);
    }
  }
  if (temArr.length) {
    for (let item of temArr) {
      menuStr += `
        <a data-id="${ATREE.id}">${item.name}</a>
        <ul>
             ${createDomMenuTree(item.id)}
        </ul>
      `;
    }
  }
  return menuStr;
}

console.log(createDomMenuTree());
