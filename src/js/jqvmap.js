// jqvmap.js

// var max = 0,
//     min = Number.MAX_VALUE,
//     cc,
//     startColor = [200, 238, 255],
//     endColor = [0, 100, 145],
//     colors = {},
//     hex;

function get_perunit_value ( value, min, max ) {
  return (( value - min ) / ( max - min ));
}

function get_colors_from_value (obj_in, min_color, max_color) {
  var colors = {};
  [min, max] = get_max_min_from_values( obj_in );

  scale = chroma.scale( [min_color, max_color] );
  //set colors according to values of GDP
  Object.keys( obj_in ).forEach( cc => {
    console.log( get_perunit_value( obj_in[cc], min, max ) );
    colors[cc.toLowerCase()] = scale( get_perunit_value( obj_in[cc], min, max )/1 ).hex();
  } )

  return colors;
}

function get_max_min_from_values (obj_in) {
  var min = 999, max = -999;

  Object.values( obj_in ).forEach( x => {
    min = Math.min( x, min );
    max = Math.max( x, max );
  })

  return [min, max];

}

function calc_colors_for_jqvmap (obj_in, min_color, max_color) {
  return get_colors_from_value( obj_in, min_color, max_color );
}
