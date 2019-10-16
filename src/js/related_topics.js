
function render_related_topics_table ( data_in, max_row=999 ) {
  var content = _.range( Math.min( data_in.length, max_row ) ).map( idx => {
    var value = data_in[idx][0];
    var topic_link = data_in[idx][1];
    var topic_text = data_in[idx][2];
    return get_table_row( [
      idx + 1,
      topic_link,
      value+get_google_search_magnifier(topic_text),

    ] );
  } )
  return get_table(
    get_thead( [ 'rank', 'topics', 'value' ] ),
    content.join( '' )
  );
}

function extract_ranked_topics_data ( json_in ) {
  console.log( json_in );
  return json_in.default.rankedList[0].rankedKeyword.map( x => {
    return [
      x.value,
      get_trend_a_href( x.topic.title, x.link, table_link_class ),
      x.topic.title
    ];
  } );
}

function related_topics ( sel_in, param_in, max_row ) {
  console.log( sel_in );
  fetch_post_request( {
      q: Q_RELATED_TOPICS,
      param: param_in
    } )
    .then( res => res.json() )
    .then( json => {
      // get_ele( "#"+id_in ).innerHTML = ;
      // get_ele( sel_in ).innerHTML = render_small_table( extract_trending_search( json ) );
      get_ele( sel_in ).innerHTML = render_related_topics_table(extract_ranked_topics_data(json), max_row);
    } );
}
