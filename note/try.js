if (isVNode(oldNode)) {
	// 相同类型节点的 diff
	if (newNode.tag === oldNode.tag && newNode.key === oldNode.key) {
		// 新老节点属性的对比
		const propsPatch = diffProps(newNode.props, oldNode.props)
		if (propsPatch && propsPatch.length > 0) {
			patch = appendPatch(patch, {
				type: PATCH.PROPS,
				patches: propsPatch,
			})
		}
		// 新老节点子节点的对比
		patch = diffChildren(oldNode, newNode, patches, patch, index)
	}
} else {
	// 新节点替换旧节点
	patch = appendPatch(patch, {
		type: PATCH.REPLACE,
		vNode: newNode,
	})
}