Changelog
=========

2.9.5
-----
 - added helpers to hide or remove DOM elements
 - added support for parallel uploads count option in Dropzone plugin
 - small CSS updates

2.9.4
-----
 - updated Gitlab-CI for Python 3.12

2.9.3
-----
 - updated calendar legend colors

2.9.2
-----
 - small updates used to display calendar legend

2.9.1
-----
 - disable cache in dynamic script loader in development mode

2.9.0
-----
 - added helper to delete table row
 - added styles to handle "hidden" calendars

2.8.0
-----
 - added support for Python 3.12
 - updated Datatables plugin integration to support columns excluded from export, print or clipboard copy

2.7.0
-----
 - updated build packages and dependencies (JQuery-UI, JQuery-validation, Datatables, JSRender...)
 - avoid duplicated modules names on dynamic import
 - added support for "application/json" content-type on AJAX requests
 - updated form submit progress getter
 - updated modal backdrop DOM position to handle static modals correctly

2.6.1
-----
 - added gradient style to calendar events

2.6.0
-----
 - added TarteAuCitron cookies manager resources
 - small updates in calendar styles

2.5.1
-----
 - updated table refresh helper
 - added arrow marker to ordered select2 inputs

2.5.0
-----
 - added table refresh helper

2.4.9
-----
 - updated inner form table styles
 - updated Select2 styles
 - updated MyAMS notifications module

2.4.8
-----
 - updated Z-index of TinyMCE editor menus to be used into modals

2.4.7
-----
 - disable modal click handler from datatable collapsing cell
 - updated tooltips line height
 - added custom CSS classes using viewport height

2.4.6
-----
 - removed calendar events overflow
 - updated content review form comments max height

2.4.5
-----
 - fixed FullCalendar packaging issue

2.4.4
-----
 - updated Emerald theme fonts
 - upgraded FullCalendar to release 6.1.11

2.4.3
-----
 - updated calendar and forms styles
 - updated Emerald theme font and colors

2.4.2
-----
 - updated Select2 styles
 - added absolute positions classes

2.4.1
-----
 - added border-style and border-width responsive classes
 - stop events propagation on navigation links
 - updated FullCalendar styles

2.4.0
-----
 - added container module helpers
 - updated table reorder selector
 - updated datatable buttons style
 - updated TinyMCE editor styles
 - small CSS updates

2.3.1
-----
 - added LightMode to MyAMS environment initializer

2.3.0
-----
 - added LightMode skin
 - added jQuery InputMask plug-in
 - added helpers to disable click on dragged elements
 - added helpers to help changing parent of an element
 - added forms checks when displaying AJAX errors
 - updated CSS styles

2.2.1
-----
 - updated fonts
 - updated colorpicker z-index to display picker in modals
 - updated Select2 styles
 - other minor CSS updates

2.2.0
-----
 - added support for modal targets in notifications links
 - added JSDom as default environment to Jest

2.1.0
-----
 - added dropzone plug-in
 - corrected tree sorting
 - updated CSS styles

2.0.1
-----
 - updated Buildout configuration

2.0.0
-----
 - migrated to Pyramid 2.0

1.16.0
------
 - added FullCalendar support plug-in
 - updated minified navigation bar styles
 - small CSS updates

1.15.8
------
 - updated Webpack configuration

1.15.7
------
 - automatically switch fieldsets and tabs containing errors on form load (and not only on
   JSON response on submit)
 - upgraded FontAwesome to release 6.3.0

1.15.6
------
 - updated clipboard module

1.15.5
------
 - use timeout in file input plug-in for correct initialization in modals

1.15.4
------
 - updated default modals z-index
 - set focus to last opened modal when another modal is hidden

1.15.3
------
 - updated ESLint configuration
 - corrected ESLint errors

1.15.2
------
 - updated MyAMS theme getter
 - updated promises handler in several plug-ins
 - new unit tests on mod-helpers

1.15.1
------
 - updated DataTables DOM property when including buttons

1.15.0
------
 - upgraded FontAwesome to release 6.2.1
 - updated Webpack configuration to manage fonts assets (and avoid browsers errors!)

1.14.2
------
 - correction in DataTables stateRestore plug-in loading
 - added support for Python 3.11

1.14.1
------
 - upgraded DataTables plug-in to release 1.13.1
 - updated dependencies
 - small menu check update

1.14.0
------
 - added click handler to submit a form from a standard action button
 - added thumbnails variables and support classes
 - added support to set a context for custom events handlers
 - added modals helper to set dialog width according to internal image width

1.13.1
------
 - updated switchers icons management in tree module
 - ajax and alert modules refactoring
 - replaced Gulp-uglify plug-in by Gulp-terser


1.13.0
------
 - updated dependencies: Bootstrap, Babel, DataTables, Jest, JQuery, JQuery-UI, Webpack...
 - updated TinyMCE dialogs style

1.12.3
------
 - packaging version mismatch

1.12.2
------
 - added support for Python 3.10
 - updated tree nodes padding
 - updated AJAX errors management
 - updated container element attribute switcher
 - updated element refresh helper
 - updated base modals z-index
 - updated TinyMCE timeout before editor initialization
 - updated font size in dropdown menus
 - handle read-only mode in ACE editor
 - updated styles

1.12.1
------
 - updated CI configuration

1.12.0
------
 - upgraded Bootstrap to version 4.6.1
 - upgraded FontAwesome to version 5.15.4
 - added helper and styles for an "SEO quality indicator" component
 - added helper to store log in form redirection hash
 - initialize data attributes before loading modules
 - handle pre-opened navigation menus
 - updated table sorting data after ordering
 - updated active menu selector to handle case where the first active menu is a submenu
 - updated FontAwesome icon switch helper
 - updated FontAwesome CSS resources
 - moved initData function to base module, and added config option to override
 - added scroll helper
 - added helper to add element to parent
 - added option to reset form after submit
 - added timeout to Datatables plug-in initialization
 - disable window "beforeunload" event handler before activating a "redirect" response
 - small styles updates

1.11.1
------
 - automatically set focus when select2 dropdown is opened
 - updated form focus handler to only set focus on the first visible and enabled input
 - updated select2 dropdown styles
 - updated datetime picker styles

1.11.0
------
 - upgraded TinyMCE editor to release 5.10.2
 - updated "modal" options to correctly handle "escape" key and modal focus
 - added "theme" attribute to MyAMS global object to get selected theme
 - handle ICE editor default theme selection based on current MyAMS theme
 - updated themes light colors
 - dark theme updates

1.10.0
------
 - added dark theme
 - added full-bundle (using CSS icons) for Emerald and Dark themes
 - added treeview plug-in
 - added datatable pre-order helper
 - updated *tree* module
 - updated SVG icons switcher

1.9.0
-----
 - added new function in notifications module to add a single notification

1.8.2
-----
 - updated notifications title

1.8.1
-----
 - added missing status color to notifications
 - tests updates

1.8.0
-----
 - added viewport related classes
 - added lighter versions of main Bootstrap colors to CSS variables

1.7.0
-----
 - added custom JQuery filter expressions
 - added custom CSS tree styles
 - added custom TinyMCE editor styles using CSS variables
 - stop event propagation on *modal* data-toggle click handler
 - updated *after-reload* callback management

1.6.4
-----
 - added support for "_top" target in links using "data-ams-target" attribute

1.6.3
-----
 - Select2 plug-in styles updates

1.6.2
-----
 - small updates in Select2 plug-in styles

1.6.1
-----
 - added missing Git JQuery-UI resources

1.6.0
-----
 - allow loading of MyAMS extensions only containing CSS files
 - automatically focus first primary button in modals
 - automatically hide tooltips before opening a new modal
 - resolve promise with modal when opening a new modal from code
 - set event source in context menu dropdown event
 - remove "data-ams-data" attribute after modules initialization
 - add JQuery-UI resizable plug-in support
 - load JQuery-UI stylesheet when using drag&drop plug-ins
 - update datatable reordering
 - updated CSS styles

1.5.1
------
 - updated form's keydown handler to submit with <ctrl>+<enter> from a textarea
 - moved focus handlers to avoid multiple initializations

1.5.0
-----
 - added table row adding helper
 - added container helper to switch element's attribute
 - updated CSS styles

1.4.2
-----
 - updated AJAX behaviour of Select2 plug-in
 - updated CSS styles
 - updated demo site documentation

1.4.1
-----
 - Updated Git fonts resources

1.4.0
-----
 - added new Emerald theme
 - included Select2 stylesheets into main stylesheet
 - small CSS updates

1.3.3
-----
 - updated TinyMCE CSS styles

1.3.2
-----
 - updated TinyMCE production build

1.3.1
-----
 - updated Gitlab-CI configuration

1.3.0
-----
 - small CSS updates
 - removed support for Python < 3.7

1.2.1
-----
 - added classes for Bootstrap modals
 - updated DataTables styles for Bootstrap
 - updated Gitlab-CI configuration
 - removed Travis-CI configuration

1.2.0
-----
 - added french translation for file input "Browse" label
 - packages upgrades
 - CSS styles updates

1.1.0
-----
 - added Bootstrap "Tempus Dominus" plug-in for datetime input fields
 - automatically scroll to errors alerts in modal forms
 - packages upgrades
 - CSS styles updates

1.0.4
-----
 - updated DataTables plug-in integration
 - updated Select2 CSS styles

1.0.3
-----
 - updated form group switcher state for inner switchers

1.0.2
-----
 - updated Fanstatic library path to switch between source and egg installations

1.0.1
-----
 - Travis update

1.0.0
-----
 - initial release
