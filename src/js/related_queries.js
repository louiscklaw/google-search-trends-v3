


function render_related_queries_table ( data_in, max_row=999 ) {
  var content = _.range( Math.min(data_in.length, max_row) ).map( idx => {
    if ( idx > 4 ) {
      return get_table_row( [idx + 1, data_in[idx][0], data_in[idx][1]], 'hide_row' );
    } else {
      return get_table_row( [idx + 1, data_in[idx][0], data_in[idx][1]] );
    }
  } )
  return get_table(
    get_thead( [ 'rank', 'value', 'queries' ] ),
    content.join( '' )
  );
}


function extract_ranked_keyword ( json_in ) {
  return json_in.default.rankedList[0].rankedKeyword.map( x => {
    return [x.value, get_a_href( x.query, x.link )];
  });
}

function related_queries ( sel_in, param_in, max_row ) {
  console.log( sel_in );
  fetch_post_request( {
      q: Q_RELATED_QUERIES,
      param: param_in
    } )
    .then( res => res.json() )
    .then( json => {
      get_ele( sel_in ).innerHTML = render_related_queries_table(extract_ranked_keyword(json), max_row);
    } );
}
