/*
 *               A
 *         B           C
 *      D     E     F   G
 *    H           i       j
 *      K
 */
let tree = {
    val: "A",
    left: {
        val: "B",
        left: {
            val: "D",
            left: {
                val: "H",
                left: null,
                right: {
                    val: "K",
                    left: null,
                    right: null
                }
            },
            right: null
        },
        right: {
            val: "E",
            left: null,
            right: null
        }
    },
    right: {
        val: "C",
        left: {
            val: "F",
            left: {
                val: "I",
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: "G",
            left: null,
            right: {
                val: "J",
                left: null,
                right: null
            }
        }
    }
}

//　递归
function _traverse(tree) {
    if (!!tree) {
        console.log(tree.val);
        traverse(tree.left);
        traverse(tree.right);
    }
}

//　循环遍历
function traverse(tree) {
    let p = tree,
        stack = [];
    while (true) {
        if (p) {
            console.log(p.val);
            stack.push(p);
            p = p.left;
        } else {
            if (!stack.length) return;
            p = stack.pop().right;
        }
    }
}
//　验证
_traverse(tree)
traverse(tree)