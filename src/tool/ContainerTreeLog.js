/* eslint-disable no-console */
export const containerTreeLog = (root, maxDepth = 3) => {
    console.log(_treelogHelper(root, maxDepth));
};
const _treelogHelper = (root, maxDepth, depth = 0) => {
    if (depth === maxDepth) {
        return '';
    }
    let result = ' '.repeat(depth * 2) + root.constructor.name + '\n';
    for (const child of root.children) {
        result += _treelogHelper(child, maxDepth, depth + 1);
    }
    return result;
};
/* eslint-enable no-console */
//# sourceMappingURL=ContainerTreeLog.js.map