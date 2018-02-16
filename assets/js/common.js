requirejs.config({
  baseUrl: '/assets/js',
  packages: [
    { name: 'dojo', location: '../../node_modules/dojo' },
    { name: 'dgrid', location: '../../node_modules/dgrid' },
    { name: 'dijit', location: '../../node_modules/dijit'},
    { name: 'dstore', location: '../../node_modules/dojo-dstore', main: 'RequestMemory'},
    { name: 'moment', location: '../../node_modules/moment', main: 'moment'},
    { name: 'mapboxGL', location: '../../node_modules/mapbox-gl/dist', main: 'mapbox-gl'}
  ],
  waitSeconds: 30
});
