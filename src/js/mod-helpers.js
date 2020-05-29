/**
 * MyAMS generic helpers
 */

const $ = MyAMS.$;


export const helpers = {

	/**
	 * Move given element to the end of it's parent
	 *
	 * @param element: the element to be moved
	 * @returns {*}
	 */
	moveElementToParentEnd: (element) => {
		const parent = element.parent();
		return element.detach()
					  .appendTo(parent);
	},

	/**
	 * Toggle dropdown associated with given event target
	 *
	 * @param evt: source event
	 */
	hideDropdown: (evt) => {
		$(evt.target).closest('.dropdown-menu').dropdown('hide');
	}
};


/**
 * Global module initialization
 */
if (window.MyAMS) {
	if (MyAMS.env.bundle) {
		MyAMS.config.modules.push('helpers');
	} else {
		MyAMS.helpers = helpers;
		console.debug("MyAMS: helpers module loaded...");
	}
}
