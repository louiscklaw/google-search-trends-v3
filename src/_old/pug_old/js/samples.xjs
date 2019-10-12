
function test_daily_trends() {
  fetch_post_request( {
      q: Q_DAILY_TRENDS,
      param: {
        trendDate: '2019-01-10',
        geo: 'US',
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_daily_trends' ).innerHTML = print_pre( text ) );
}

function test_related_queries() {
  fetch_post_request( {
      q: Q_RELATED_QUERIES,
      param: {
        keyword: 'Westminster Dog Show'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_related_queries' ).innerHTML = print_pre( text ) );
}

function test_related_topics() {
  fetch_post_request( {
      q: Q_RELATED_TOPICS,
      param: {
        keyword: 'Chipotle',
        startTime: '2015-01-01',
        endTime: '2017-02-10'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_related_topics' ).innerHTML = print_pre( text ) );
}

function test_chart_interest_over_time() {
  var _chart_id = 'test_chart_id';
  keywords_to_search = [ 'Valentines Day' ];
  fetch_post_request( {
      q: Q_INTEREST_OVER_TIME,
      param: {
        keyword: keywords_to_search
      }
    } )
    .then( res => res.text() )
    .then( text => JSON.parse( text ) )
    .then( json => {
      get_ele( '#test_chart_interest_over_time' ).innerHTML = get_chartjs_canvas_html( _chart_id );
      return json;
    } )
    .then( ( json ) => {
      create_chart( _chart_id, keywords_to_search, json );
    } );
}

function test_interest_over_time() {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  fetch_post_request( {
      q: Q_INTEREST_OVER_TIME,
      param: {
        keyword: 'Valentines Day'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_interest_over_time' ).innerHTML = print_pre( text ) );
}

function test_interest_by_region() {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  fetch_post_request( {
      q: Q_INTEREST_BY_REGION,
      param: {
        keyword: 'Donald Trump',
        startTime: '2017-02-01',
        endTime: '2017-02-06',
        resolution: 'COUNTRY'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_interest_by_region' ).innerHTML = print_pre( text ) );
}

document.addEventListener( "DOMContentLoaded", function () {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  test_interest_by_region();
  test_interest_over_time();
  test_daily_trends();
  test_related_queries();
  test_related_topics();
  test_chart_interest_over_time();
} );
