// jqvmap.js

var LABEL_COUNTRY_VALUE = "Ranking";
var LABEL_COUNTRY_NAME = "Country";

function get_top_x_location(map_result_in, value_wanted) {
  var locations = [];
  Object.keys(map_result_in).forEach(cc => {
    if (map_result_in[cc] == value_wanted) {
      locations.push(cc);
    }
  });
  return locations;
}

function get_top_x_value(map_result_in, top_x) {
  var top_values = [];
  _.range(top_x).forEach(x => {
    top_values.push(Object.values(map_result_in).sort((a, b) => b - a)[x]);
  });
  return top_values;
}

function get_top_from_map(map_result_in, top_x) {
  return get_top_x_value(map_result_in, top_x).map(x => {
    return [x, get_top_x_location(map_result_in, x)];
  });
}

function encap_html_tag(value, tag) {
  return "<" + tag + ">" + value + "</" + tag + ">";
}
function gen_table_content(map_result_in, top_x) {
  return (
    get_top_from_map(map_result_in, top_x)
      // filter out if 0 appears in top 3 country
      .filter(x => x[0] > 0)
      .map(x => {
        var value = x[0];
        var countries = x[1];

        var countries_html = countries
          .map(x => cc_conv[x.toLowerCase()])
          .join("<br>");
        return encap_html_tag(
          encap_html_tag(value, "td") + encap_html_tag(countries_html, "td"),
          "tr"
        );
      })
  );
}

function gen_table_column_header(col_names_in) {
  return encap_html_tag(
    encap_html_tag(
      col_names_in.map(x => encap_html_tag(x, "td")).join(""),
      "tr"
    ),
    "thead"
  );
}

function gen_top_x_table(map_result_in, top_x) {
  return (
    '<table class="table">' +
    gen_table_column_header([LABEL_COUNTRY_VALUE, LABEL_COUNTRY_NAME]) +
    gen_table_content(map_result_in, top_x).join("") +
    "</table>"
  );
}

function get_perunit_value(value, min, max) {
  return (value - min) / (max - min);
}

function get_colors_from_value(obj_in, min_color, max_color) {
  var colors = {};
  [min, max] = get_max_min_from_values(obj_in);

  scale = chroma.scale([min_color, max_color]);
  //set colors according to values of GDP
  Object.keys(obj_in).forEach(cc => {
    colors[cc.toLowerCase()] = scale(
      get_perunit_value(obj_in[cc], min, max) / 1
    ).hex();
  });

  return colors;
}

function get_max_min_from_values(obj_in) {
  var min = 999,
    max = -999;

  Object.values(obj_in).forEach(x => {
    min = Math.min(x, min);
    max = Math.max(x, max);
  });

  return [min, max];
}

function calc_colors_for_jqvmap(obj_in, min_color, max_color) {
  return get_colors_from_value(obj_in, min_color, max_color);
}
