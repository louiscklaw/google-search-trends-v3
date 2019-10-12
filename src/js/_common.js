// common.js

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

function get_attr ( ele_in, attr_in ) {
  return ele_in.getAttribute( attr_in );
}

function helloworld () {
  alert( 'helloworld' );
}

function print_pre( str_in ) {
  return '<pre>' + str_in + '</pre>';
}

function get_ele( sel_in ) {
  return document.querySelector( sel_in );
}

function get_eles( sel_in ) {
  return document.querySelectorAll( sel_in );
}

function get_google_trend_href( href_in ) {
  return 'https://trends.google.com' + href_in;
}

function encap ( content, encap, encap_class='' ) {
  if ( encap_class != '' ) {
    return '<' + encap + ' class="'+encap_class+'">' + content + '</' + encap + '>';
  } else {
    return '<' + encap + '>' + content + '</' + encap + '>';
  }
}

function encap_td ( content, td_class="" ) {
  return encap(content,'td', td_class);
}

function encap_tr ( content, tr_class = "" ) {
  return encap( content, 'tr', tr_class );
}

function encap_thead ( content ) {
  console.log( content );
  return encap( content, 'thead' );
}

function encap_tfoot ( content ) {
  return encap( content, 'tfoot' );
}

function get_non_google_a_href ( text, href ) {
  return '<a href="' + href + '" target="_blank">' + text + '</a>';
}

function get_a_href( text, href ) {
  return '<a href="' + get_google_trend_href( href ) + '" target="_blank">' + text + '</a>';
}

function get_thead ( cols_name ) {
  // console.log( cols_name );
  return encap_thead(
    encap_tr(
      _.range( cols_name.length ).map( idx => {
        if ( idx > 2 ) {
          return encap_td( cols_name[idx], 'hide_column' );
        } else {
          return encap_td( cols_name[idx] );
        }
      }).join('')
    )
  )
  // return encap_thead(encap_tr(cols_name.map( x => encap_td(x) ).join('')));
}

function get_tfoot( cols_name ) {
  return encap_tfoot(encap_tr(cols_name.map( x => encap_td(x) ).join('')));
}

function get_table_row ( row_content, row_class='' ) {

  // var content = row_cotnent.map( x => encap_td(x,'test') );
  var content = _.range( row_content.length ).map( idx =>{
    if ( idx > 2 ) {
      return encap_td( row_content[idx], [
        'td_' + idx,
        'hide_column'
      ].join( ' ' )
      );
    } else {
      return encap_td( row_content[idx], 'td_' + idx );
    }
  });
  return encap_tr(content.join(''), row_class);
}

function get_table (thead, table_content ) {
  return [
    '<table class="table">',
    thead,
    table_content,
    '</table>'
  ].join( '' );
}

function helloworld_date () {
  return new Date();
}
