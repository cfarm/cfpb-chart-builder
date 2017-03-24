'use strict';

var Highcharts = require( 'highcharts/js/highstock' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );


function BarChart( props ) {
  var options = {
    title: {
      text: props.title
    },
    className: 'cfpb-chart_bar',
    description: props.description,
    credits: false,
    rangeSelector: {
      selected: 'all',
      height: 35,
      inputEnabled: false,
/* TODO: buttonSpacing will be re-integrated with responsive styles */
//      buttonSpacing: 15,
      buttonPosition: {
        x: 0,
        y: 30
      },
      buttonTheme: {
/* TODO: width will be re-integrated with responsive styles */
//        width: 45,
        r: 5, // border radius
        fill: '#CCE3F5',
        style: {
          height: '35px',
          fontSize: '14px'
        },
        states: {
          select: {
            fill: '#7FB8E6',
            fontWeight: 'bold'
          }
        }
      },
      buttons: [ {
        type: 'year',
        count: 1,
        text: '1y'
      },
      {
        type: 'year',
        count: 3,
        text: '3y'
      },
      {
        type: 'year',
        count: 5,
        text: '5y'
      },
      {
        type: 'all',
        text: 'All'
      }
      ]
    },
    chart: {
      marginTop: 100,
      zoomType: 'none'
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 1,
        groupPadding: 0,
        shadow: false,
        grouping: false
      }
    },
    xAxis: {
      labels: {
        style: {
          fontSize: '16px',
          fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif",
          color: '#5a5d61'
        }
      },
      lineColor: '#d2d3d5',
      tickColor: '#d2d3d5',
      gridLineColor: '#d2d3d5',
      startOnTick: true,
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%b<br/>%Y',
        year: '%b<br/>%Y'
      },
      plotLines: [ {
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected',
          align: 'right',
          rotation: 0,
          style: {
            color: '#5a5d61'
          },
          y: -15
        }
      } ]
    },
    yAxis: {
      opposite: false,
      labels: {
        style: {
          fontSize: '16px',
          fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif",
          color: '#5a5d61'
        }
      },
      lineColor: '#d2d3d5',
      tickColor: '#d2d3d5',
      gridLineColor: '#d2d3d5',
      title: {
        text: 'Year-over-year change (%)',
        style: {
          'color': '#5a5d61',
          'font-size': '16px'
        },
        x: -15
      }
    },
    navigator: {
      maskFill: 'rgba(0, 0, 0, 0.05)',
      handles: {
        backgroundColor: '#fff',
        borderColor: '#101820'
      },
      series: {
        lineWidth: 2
      }
    },
    series: [ {
      type: 'column',
      data: props.data,
      name: 'Year-over-year change (%)',
      tooltip: {
        valueDecimals: 2
      },
      zoneAxis: 'x',
      zones: [ {
        value: props.data.projectedDate.timestamp,
        className: 'highcharts-data__unprojected'
      }, {
      } ]
    } ]
  };

  Highcharts.stockChart( props.selector, options,
    function( chart ) {
      chart.renderer.text( 'Select time range', 7, 16 )
        .css( {
          color: '#5a5d61',
          fontSize: '14px'
        } )
        .add();

      chart.renderer.rect( 0, 75, 650, 2 )
        .attr( {
          fill: '#E3E4E5',
          zIndex: 10
        } )
        .add();
    }
  );

}

module.exports = BarChart;
