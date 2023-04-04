/***************************************
*	Author: Travolgi
*	Theme: WeatherCast
*	Version: 1.0.0
*	Created: 05/04/2023
*	Last update: 05/04/2023
***************************************/

/*
* Preload
*/
(() => {
   if (window.addEventListener) {
      window.addEventListener('load', () => document.querySelector('#preload').style.display = 'none', false);
   } else {
      window.attachEvent('onload', () => document.querySelector('#preload').style.display = 'none');
   }
})();

/*
* Navbar
*/
const navToggle = document.querySelector('.mobile-nav-toggle'),
		nav = document.querySelector('.header-nav');

navToggle.addEventListener('click', () => {
	const visible = nav.getAttribute('data-visible');
	if(visible === 'false') {
		nav.setAttribute('data-visible', true);
		navToggle.setAttribute('aria-expanded', true);
	} else {
		nav.setAttribute('data-visible', false);
		navToggle.setAttribute('aria-expanded', false);
	}
});

/*
* Tabs
*/
const tabsList = document.querySelector('[role="tablist"]');

if(tabsList) {
	const tabs = tabsList.querySelectorAll('[role="tab"]');
	tabsList.addEventListener('keydown', changeTabFocus);
	tabs.forEach(tab => tab.addEventListener('click', changeTabPanel));

	let tabFocus = 0;
	function changeTabFocus(e){
		const keyLeftArrow = 37,
				keyRightArrow = 39;

		if(e.keyCode === keyLeftArrow || e.keyCode === keyRightArrow) {
			tabs[tabFocus].setAttribute('tabindex', -1);

			if(e.keyCode === keyRightArrow){
				tabFocus++;
				if(tabFocus >= tabs.length){
					tabFocus = 0;
				}
			} else {
				tabFocus--;
				if(tabFocus < 0){
					tabFocus = tabs.length - 1;
				}
			}
		
			tabs[tabFocus].setAttribute('tabindex', 0);
			tabs[tabFocus].focus();
		}
	}

	function changeTabPanel(e) {
		const target = e.target,
				targetPanel = target.getAttribute('aria-controls'),
				targetImg = target.getAttribute('data-image'),
				tabContainer = target.parentNode,
				mainContainer = tabContainer.parentNode;
		
		tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
		target.setAttribute('aria-selected', true);
		
		hideContent(mainContainer, '[role="tabpanel"]');
		showContent(mainContainer, [`#${targetPanel}`]);
		
		hideContent(mainContainer, 'picture');
		showContent(mainContainer, [`#${targetImg}`]);
	}

	const hideContent = (parent, content) => parent.querySelectorAll(content).forEach(ele => ele.setAttribute('hidden', true));
	const showContent = (parent, content) => parent.querySelector(content).removeAttribute('hidden');
}

/*
* Footer date
*/
document.body.querySelector('#thisYear').innerHTML= new Date().getFullYear();

/*
* Animate on scrool
*/
AOS.init({
	duration: 700,
	easing: 'ease-in-ease-in-cubic',
	anchorPlacement: 'center-center'
});