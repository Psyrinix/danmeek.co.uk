
import querySelectorAll from "../utils/querySelectorAll";

export default class HeroComponent extends HTMLElement {
	constructor() {
		super();
	}

	toggleActive(element:any) {
		console.log('demoElement.toggleActive');
		return element.classList.contains('hero--active') ? element.classList.remove('hero--active') : element.classList.add('hero--active');
	}

	connectedCallback() {
		const element = this;
		element.addEventListener("click", () => {
			this.toggleActive(element);
		});
	}
}
customElements.define("hero-component", HeroComponent);