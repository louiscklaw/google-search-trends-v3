


function render_related_queries_table ( data_in, max_row=999 ) {
  var content = _.range( Math.min( data_in.length, max_row ) ).map( idx => {
    var queries = data_in[idx][1];
    var value = data_in[idx][0];
    return get_table_row( [
      idx + 1,
      queries,
      value+get_google_search_magnifier('apple'),
    ] );
  } )
  return get_table(
    get_thead( related_queries_column ),
    content.join( '' )
  );
}


function extract_ranked_keyword ( json_in ) {
  return json_in.default.rankedList[0].rankedKeyword.map( x => {
    return [x.value, get_trend_a_href( x.query, x.link , table_link_class )];
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
