/**
 * Returns result of querySelectorAll as an array.
 *
 * @param {string} selectors
 * @param {Document|Element} el [document]
 * @return {Array<Element>}
 */
export default function querySelectorAll(selectors: any, el = window.document) {
	const result = el.querySelectorAll(selectors);

	return Array.prototype.slice.call(result);
}