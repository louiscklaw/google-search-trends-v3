var daily_trends_column = ['rank', 'topic', 'traffic', 'google', 'articles'];


function get_google_search_magnifier ( search_text ) {
  return get_search_a_href(
    '<i class="fas fa-search"></i>',
    search_text,
    'google_search_magnifier',
    'search in google'
  );
}

function extract_title ( json_in ) {
  console.log( json_in );
  return json_in.trendingSearchesDays[ 0 ].trendingSearches.map( x => x.title );
}

function extract_articles_for_daily_trends ( json_in, num_of_link=99) {
  var out = [];
  _.range( Math.min(json_in.articles.length, num_of_link) ).forEach( x => {
    out.push(get_non_google_a_href( json_in.articles[x].title, json_in.articles[x].url ))
  } )
    ;
  return out.join('<br>');
}

function render_small_table( json_in ) {
  var content = _.range( Math.min( json_in.length, max_table_row ) ).map( idx => {
    var search_text = json_in[idx].title.query;
    var search_link = json_in[idx].title.exploreLink;
    return get_table_row( [
      idx + 1,
      get_trend_a_href( search_text, search_link, table_link_class ),
      json_in[ idx ].formattedTraffic+get_google_search_magnifier(search_text),
      ( json_in[idx].articles.length ? extract_articles_for_daily_trends( json_in[idx], 3 ) : '' ),
    ] );
  } );

  return get_table(
    get_thead( daily_trends_column ),
    content.join( '' )
  );
}

function extract_trending_search ( json_in ) {
  return json_in.default.trendingSearchesDays[0].trendingSearches;
}


function daily_trends( sel_in, params ) {
  fetch_post_request( {
      q: Q_DAILY_TRENDS,
      param: params
    } )
    .then( res => res.json() )
    .then( json => {
      get_ele( sel_in ).innerHTML = render_small_table( extract_trending_search( json ) );


    } );
}
