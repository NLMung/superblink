requirejs.config(
{
	baseUrl: 'js/lib',
	paths: {
		almond: '../../almond',
		sudoku: '../app/sudoku',
		messenger: '../app/messenger',
		ivy: '../app/ivy',
		app: '../app/app'
	}
});

require(['app']);
