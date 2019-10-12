// cards.js



const CHART_COLORS = [
  [ 'rgba(241, 196, 15,1.0)', 'rgba(241, 196, 15,0.1' ],
  [ 'rgba(230, 126, 34,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(231, 76, 60,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(26, 188, 156,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(52, 152, 219,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(155, 89, 182,1.0)', 'rgb(255, 99, 132)' ],

];

function get_backgrouncColor( color_settings_in ) {
  return color_settings_in[ 0 ];
}


function get_borderColor( color_settings_in ) {
  return color_settings_in[ 1 ];
}

function trends_helloworld() {
  console.log( 'trends_helloworld' );
}

function fetch_post_request( json_in ) {
  return fetch( API_BASE_URL + '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( json_in )
  } );
}

function toggle_enlarge_for_table( card ) {
  get_eles( '.cards' ).forEach( element => {
    if ( element.id == card.id ) {
      element.classList.toggle( 'card_enlarge' );
    } else {
      element.classList.remove( 'card_enlarge' );
    }
  } );
}
function process_click_to_enlarge() {
  // only process enlarge when clicking in card_content

  return true;
}

function check_card_state ( ele_in ) {
  return get_attr( ele_in, DATA_WIDGET_STATE );
}

function set_card_state ( ele_in, size ) {
  ele_in.setAttribute(DATA_WIDGET_STATE, size)
}

function get_card_by_button ( ele_in ) {
  return ele_in.parentNode.parentNode.parentNode;
}

function change_to_large_card ( button_ele_in ) {
  set_card_state( button_ele_in, CARD_STATE_LARGE );
  get_card_by_button( button_ele_in ).classList.add( 'card_enlarge' );
}

function change_to_small_card ( button_ele_in ) {
  set_card_state( button_ele_in, CARD_STATE_SMALL );
  get_card_by_button( button_ele_in ).classList.remove( 'card_enlarge' );
}

function clear_large_card_space () {
  console.log( get_eles( '.card_enlarge' ).length );
  if ( get_eles('.card_enlarge').length >0 ) {
    get_eles( '.card_enlarge button' ).forEach( button_in => {
      console.log( button_in );
      change_to_small_card( button_in );
    }) ;
  }
}

function toggle_enlarge ( ele_in ) {
  if ( check_card_state( ele_in ) == CARD_STATE_LARGE ) {
    console.log(ele_in)
    change_to_small_card( ele_in );

  } else {
    // check if currently a large card found
    clear_large_card_space();

    change_to_large_card( ele_in );

  }
}

function init_cards() {
  get_eles( '.toggle_enlarge' ).forEach( ele => {
    ele.setAttribute( DATA_WIDGET_STATE, CARD_STATE_SMALL );
  } );
}

function get_chartjs_canvas_html( chart_id ) {
  return '<canvas id=' + chart_id + '></canvas>';
}

function extract_chart_label( json_in ) {
  return json_in.default.timelineData.map( x => {
    return x.formattedAxisTime;
  } );

}

function extract_chart_data( json_in, idx = 0 ) {
  return json_in.default.timelineData.map( x => {
    return x.value[ idx ];
  } );

}

// function translate_to_charts_js_data( json_in, label ) {
//   return {
//     labels: extract_chart_label( json_in ),
//     datasets: [ {
//       label: 'hardcode',
//       // backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: extract_chart_data( json_in ),
//     } ]
//   };
// }

function create_chart( chart_id, keywords_in, data_json ) {
  var ctx = document.getElementById( chart_id ).getContext( '2d' );
  var chart = new Chart( ctx, {
    type: 'line',
    data: {
      labels: extract_chart_label( data_json ),
      datasets: _.range( keywords_in.length ).map( x => {

        return {
          label: keywords_in[ x ],
          backgroundColor: CHART_COLORS[ x ][ 0 ].replace( '1.0', '0.1' ),
          borderColor: CHART_COLORS[ x ][ 0 ],
          data: extract_chart_data( data_json, x ),
        }
      } )
    },
    options: {
      maintainAspectRatio: false
    }
  } );
}

document.addEventListener( "DOMContentLoaded", function () {
  init_cards();
} );
