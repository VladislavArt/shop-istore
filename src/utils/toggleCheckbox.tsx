function toggleCheckbox(items: string[], item: string) {
	const currentItem = items.indexOf(item)
	if (currentItem !== -1) {
		items.splice(currentItem, 1)
	} else {
		items.push(item)
	}
}

export default toggleCheckbox
