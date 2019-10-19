// _vars.js

var current_target;

var event_target;
var event_target_tag_name;
var ignore_click_tag_name = ['A'];

var CARD_STATE_SMALL = 'small';
var CARD_STATE_LARGE = 'large';

var DATA_WIDGET_STATE = 'data-widget-state';

var DATA_CARD_CATEGORY = 'data-card-category';

var max_table_row = 10;
var max_table_col = 3;

var table_link_class = 'button is-white is-small';

var max_column = 2;

var related_topics_column = ['rank', 'topics', 'value'];
var related_queries_column = ['rank', 'queries', 'value'];
var daily_trend_chart_column = ['item', 'Avg value', 'Max', 'Min'];

const debug = true;

// jqvmap
var hover_color = 'rgba(231, 76, 60,1.0)';
var background_color = 'rgba(236, 240, 241,0.3)';
var min_color = 'rgba(192, 57, 43,0.1)';
var max_color = 'rgba(192, 57, 43,1.0)';
