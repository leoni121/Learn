/**
 * @Author nzq
 * @Date 2019/4/16
 * @Description:
 * @Param:
 * @Return:
 */

function replaceSpace(str)
{
  return str.replace(/\s/g, '%20');
}

console.log(replaceSpace('We Are Happy.'));
