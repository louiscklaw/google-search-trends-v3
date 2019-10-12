// app.js


function highlight_button( sel_in ) {
  console.log( 'highlight_button:' + sel_in );
  get_ele( sel_in ).classList.add( 'nav_button_highlighted' );
}

function unhighlight_button() {
  get_eles( '.nav_button' ).forEach( x => {
    x.classList.remove( 'nav_button_highlighted' );
  } )
  // get_ele(sel_in).classList.remove('nav_button_highlighted')
}

function update_highlight_button( hash_in ) {
  document.querySelectorAll( 'div.nav_button' ).forEach( x => {
    if ( x.id != null & x.id != '' ) {
      if ( "#" + x.id == hash_in ) {
        x.classList.add( 'nav_button_highlighted' );
      } else {
        x.classList.remove( 'nav_button_highlighted' );
      }
    }


  } )
}

function listen_to_hash_change() {
  window.addEventListener( 'hashchange', function () {
    // clear_all_highlight_button();
    update_highlight_button( window.location.hash );
    refresh_cards_size(window.location.hash);
  } );
}

function init_grid_animation() {

  const grid = document.querySelector( ".grid" );
  animateCSSGrid.wrapGrid( grid, {
    duration: 600
  } );

}

function process_topic_graph ( ele_in ) {
  ele_in.classList.remove( 'grid_widget' );
  ele_in.classList.add( 'grid_topic_graph' );
}

function process_grid_widget ( ele_in ) {
  ele_in.classList.remove( 'grid_topic_graph' );
  ele_in.classList.add( 'grid_widget' );
}

function make_topic_card ( sel_in ) {
  get_ele( sel_in ).classList.remove( 'card_enlarge' );
  get_ele( sel_in ).classList.add( 'topic_card' );
}

function remove_topic_card ( sel_in ) {
  get_eles( sel_in ).forEach( card_ele => {
    card_ele.classList.remove( 'topic_card' );
  });
}

function hide_card (ele_in) {
  ele_in.classList.add( 'hide_card' );
}

function show_card (ele_in) {
  ele_in.classList.remove( 'hide_card' );
}

function hide_card_by_sel ( sel_in ) {
  get_ele( sel_in ).classList.add( 'hide_card' );
}

function show_card_by_sel ( sel_in ) {
  get_eles( sel_in ).forEach( card_ele => {
    card_ele.classList.remove( 'hide_card' );
  })
}

function show_all_cards () {
  show_card_by_sel('.cards')
}

function select_cards_by_category ( cat_wanted_in ) {
  get_eles( '.cards' ).forEach( card_ele => {
    if ( get_attr( card_ele, DATA_CARD_CATEGORY ) == cat_wanted_in ) {
      show_card( card_ele );
    } else {
      hide_card( card_ele );
    }
  })
}

var CARD_CATEGORY_SETTINGS = {
  '#home': () => {
    remove_topic_card( '.topic_card' );
    show_all_cards();
  },
  '#programming': () => {
    select_cards_by_category('#programming');
    make_topic_card( '#language_trend' );
    console.log(document.querySelectorAll('[data-card-category="#programming"]'))
  },
  '#trending_search': () => {
    select_cards_by_category('#trending_search');
  }
};


function refresh_cards_size( hash_in ) {
  // alert( hash_in );
  if ( Object.keys( CARD_CATEGORY_SETTINGS ).includes( hash_in ) ) {
    CARD_CATEGORY_SETTINGS[hash_in]();
  }
}

// function init_click_monitor () {
//   window.onclick = e => {


//     event_target_tag_name = e.target.tagName;
//     event_target = e.target;
//     current_target = e.currentTarget;

//     console.log( event_target );
//     console.log( current_target );

//   }
// }

document.addEventListener( "DOMContentLoaded", function () {
  // if ( window.location.hash == '' ) {
  //   console.log( 'windows hash found empty, pointing to default hash' );
  //   window.location.hash = DEFAULT_HASH;
  // }
  if ( window.location.hash == '' ) {
    update_highlight_button( DEFAULT_HASH );
  } else {
    update_highlight_button( window.location.hash );
  }
  // init_click_monitor();
  listen_to_hash_change();

  // init_grid_animation();

} );
