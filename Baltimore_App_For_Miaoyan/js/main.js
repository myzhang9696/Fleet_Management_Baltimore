
$(function () {

  var risk = 0.1878;
  var risk_text = Math.round(risk * 1000) / 10 + "%";
  var cut_off = 0.28;
  var warranty = 6;
  var totalRevenue = 45000,
      totalUsers = 7687036;
  $("#calculate").click(function(e) {
    var id = $('#id_key').val();
    var id_n;
    var flag = 0;
    for(var i = 0; i<data_1.length; i++){
      if(data_1[i].EhKey == id){
        risk = data_1[i].Probs;
        id_n = i;
        $("#vehicle_id").text(`Vehicle ID: ${id}`);
        flag =1;
      }
    }
    if(flag==0){alert("This ID do not exist");}
    risk_text = Math.round(risk * 1000) / 10 + "%";
    if(risk<cut_off){
      var salesDoughnutChartUS = new CanvasJS.Chart("sales-doughnut-chart-us", {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          fontColor: "#848484",
          fontSize: 70,
          horizontalAlign: "center",
          text: risk_text,
          verticalAlign: "center"
        },
        toolTip: {
          backgroundColor: "#ffffff",
          borderThickness: 0,
          cornerRadius: 0,
          fontColor: "#424242"
        },
        data: [
          {
            explodeOnClick: false,
            innerRadius: "96%",
            radius: "90%",
            startAngle: 270,
            type: "doughnut",
            dataPoints: [
              { y: risk*100, color: "#00c700", toolTipContent: `There is a ${risk_text} Chance that the Next Trip is a comeback Trip` },
              { y: (1-risk)*100, color: "#424242", toolTipContent: null }
            ]
          }
        ]
      });
      var salesDoughnutChartNL = new CanvasJS.Chart("sales-doughnut-chart-nl", {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          fontColor: "#848484",
          fontSize: 50,
          horizontalAlign: "center",
          text: "REG",
          verticalAlign: "center"
        },
        toolTip: {
          backgroundColor: "#ffffff",
          borderThickness: 0,
          cornerRadius: 0,
          fontColor: "#424242"
        },
        data: [
          {
            explodeOnClick: false,
            innerRadius: "56%",
            radius: "90%",
            startAngle: 270,
            type: "doughnut",
            dataPoints: [
              { y: 100, color: "#00c700", toolTipContent: "This Trip is a regular Trip <span>" },
              { y: 0, color: "#424242", toolTipContent: null }
            ]
          }
        ]
      });
      var salesDoughnutChartDE = new CanvasJS.Chart("sales-doughnut-chart-de", {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          fontColor: "#848484",
          fontSize: 40,
          horizontalAlign: "center",
          text: "6 months",
          verticalAlign: "center"
        },
        toolTip: {
          backgroundColor: "#ffffff",
          borderThickness: 0,
          cornerRadius: 0,
          fontColor: "#424242"
        },
        data: [
          {
            explodeOnClick: false,
            innerRadius: "96%",
            radius: "90%",
            startAngle: 270,
            type: "doughnut",
            dataPoints: [
              { y: 100, color: "#00c700", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${warranty} months<span>` },
              { y: 0, color: "#424242", toolTipContent: null }
            ]
          }
        ]
      });
      salesDoughnutChartUS.render();
      salesDoughnutChartNL.render();
      salesDoughnutChartDE.render();
    }else{
      var salesDoughnutChartUS = new CanvasJS.Chart("sales-doughnut-chart-us", {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          fontColor: "#848484",
          fontSize: 70,
          horizontalAlign: "center",
          text: risk_text,
          verticalAlign: "center"
        },
        toolTip: {
          backgroundColor: "#ffffff",
          borderThickness: 0,
          cornerRadius: 0,
          fontColor: "#424242"
        },
        data: [
          {
            explodeOnClick: false,
            innerRadius: "96%",
            radius: "90%",
            startAngle: 270,
            type: "doughnut",
            dataPoints: [
              { y: risk*100, color: "#c70000", toolTipContent: `There is a ${risk_text} Chance that the Next Trip is a comeback Trip` },
              { y: (1-risk)*100, color: "#424242", toolTipContent: null }
            ]
          }
        ]
      });
      var salesDoughnutChartNL = new CanvasJS.Chart("sales-doughnut-chart-nl", {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          fontColor: "#848484",
          fontSize: 50,
          horizontalAlign: "center",
          text: "CB",
          verticalAlign: "center"
        },
        toolTip: {
          backgroundColor: "#ffffff",
          borderThickness: 0,
          cornerRadius: 0,
          fontColor: "#424242"
        },
        data: [
          {
            explodeOnClick: false,
            innerRadius: "56%",
            radius: "90%",
            startAngle: 270,
            type: "doughnut",
            dataPoints: [
              { y: 100, color: "#c70000", toolTipContent: "This Trip is a comeback Trip <span>" },
              { y: 0, color: "#424242", toolTipContent: null }
            ]
          }
        ]
      });
      var salesDoughnutChartDE = new CanvasJS.Chart("sales-doughnut-chart-de", {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          fontColor: "#848484",
          fontSize: 40,
          horizontalAlign: "center",
          text: "6 months",
          verticalAlign: "center"
        },
        toolTip: {
          backgroundColor: "#ffffff",
          borderThickness: 0,
          cornerRadius: 0,
          fontColor: "#424242"
        },
        data: [
          {
            explodeOnClick: false,
            innerRadius: "96%",
            radius: "90%",
            startAngle: 270,
            type: "doughnut",
            dataPoints: [
              { y: 100, color: "#c70000", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${warranty} months<span>` },
              { y: 0, color: "#424242", toolTipContent: null }
            ]
          }
        ]
      });
      salesDoughnutChartUS.render();
      salesDoughnutChartNL.render();
      salesDoughnutChartDE.render();
    };




  });
  // CanvasJS doughnut chart to show annual sales percentage from United States(US)

  if(risk<cut_off){
    var salesDoughnutChartUS = new CanvasJS.Chart("sales-doughnut-chart-us", {
      animationEnabled: true,
      backgroundColor: "transparent",
      title: {
        fontColor: "#848484",
        fontSize: 70,
        horizontalAlign: "center",
        text: risk_text,
        verticalAlign: "center"
      },
      toolTip: {
        backgroundColor: "#ffffff",
        borderThickness: 0,
        cornerRadius: 0,
        fontColor: "#424242"
      },
      data: [
        {
          explodeOnClick: false,
          innerRadius: "96%",
          radius: "90%",
          startAngle: 270,
          type: "doughnut",
          dataPoints: [
            { y: risk*100, color: "#00c700", toolTipContent: `There is a ${risk_text} Chance that the Next Trip is a comeback Trip` },
            { y: (1-risk)*100, color: "#424242", toolTipContent: null }
          ]
        }
      ]
    });
    var salesDoughnutChartNL = new CanvasJS.Chart("sales-doughnut-chart-nl", {
      animationEnabled: true,
      backgroundColor: "transparent",
      title: {
        fontColor: "#848484",
        fontSize: 50,
        horizontalAlign: "center",
        text: "REG",
        verticalAlign: "center"
      },
      toolTip: {
        backgroundColor: "#ffffff",
        borderThickness: 0,
        cornerRadius: 0,
        fontColor: "#424242"
      },
      data: [
        {
          explodeOnClick: false,
          innerRadius: "56%",
          radius: "90%",
          startAngle: 270,
          type: "doughnut",
          dataPoints: [
            { y: 100, color: "#00c700", toolTipContent: "This Trip is a regular Trip <span>" },
            { y: 0, color: "#424242", toolTipContent: null }
          ]
        }
      ]
    });
    var salesDoughnutChartDE = new CanvasJS.Chart("sales-doughnut-chart-de", {
      animationEnabled: true,
      backgroundColor: "transparent",
      title: {
        fontColor: "#848484",
        fontSize: 40,
        horizontalAlign: "center",
        text: "6 months",
        verticalAlign: "center"
      },
      toolTip: {
        backgroundColor: "#ffffff",
        borderThickness: 0,
        cornerRadius: 0,
        fontColor: "#424242"
      },
      data: [
        {
          explodeOnClick: false,
          innerRadius: "96%",
          radius: "90%",
          startAngle: 270,
          type: "doughnut",
          dataPoints: [
            { y: 100, color: "#00c700", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${warranty} months<span>` },
            { y: 0, color: "#424242", toolTipContent: null }
          ]
        }
      ]
    });
  }else{
    var salesDoughnutChartUS = new CanvasJS.Chart("sales-doughnut-chart-us", {
      animationEnabled: true,
      backgroundColor: "transparent",
      title: {
        fontColor: "#848484",
        fontSize: 70,
        horizontalAlign: "center",
        text: risk_text,
        verticalAlign: "center"
      },
      toolTip: {
        backgroundColor: "#ffffff",
        borderThickness: 0,
        cornerRadius: 0,
        fontColor: "#424242"
      },
      data: [
        {
          explodeOnClick: false,
          innerRadius: "96%",
          radius: "90%",
          startAngle: 270,
          type: "doughnut",
          dataPoints: [
            { y: risk*100, color: "#c70000", toolTipContent: `There is a ${risk_text} Chance that the Next Trip is a comeback Trip` },
            { y: (1-risk)*100, color: "#424242", toolTipContent: null }
          ]
        }
      ]
    });
    var salesDoughnutChartNL = new CanvasJS.Chart("sales-doughnut-chart-nl", {
      animationEnabled: true,
      backgroundColor: "transparent",
      title: {
        fontColor: "#848484",
        fontSize: 50,
        horizontalAlign: "center",
        text: "CB",
        verticalAlign: "center"
      },
      toolTip: {
        backgroundColor: "#ffffff",
        borderThickness: 0,
        cornerRadius: 0,
        fontColor: "#424242"
      },
      data: [
        {
          explodeOnClick: false,
          innerRadius: "56%",
          radius: "90%",
          startAngle: 270,
          type: "doughnut",
          dataPoints: [
            { y: 100, color: "#c70000", toolTipContent: "This Trip is a comeback Trip <span>" },
            { y: 0, color: "#424242", toolTipContent: null }
          ]
        }
      ]
    });
    var salesDoughnutChartDE = new CanvasJS.Chart("sales-doughnut-chart-de", {
      animationEnabled: true,
      backgroundColor: "transparent",
      title: {
        fontColor: "#848484",
        fontSize: 40,
        horizontalAlign: "center",
        text: "6 months",
        verticalAlign: "center"
      },
      toolTip: {
        backgroundColor: "#ffffff",
        borderThickness: 0,
        cornerRadius: 0,
        fontColor: "#424242"
      },
      data: [
        {
          explodeOnClick: false,
          innerRadius: "96%",
          radius: "90%",
          startAngle: 270,
          type: "doughnut",
          dataPoints: [
            { y: 100, color: "#c70000", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${warranty} months<span>` },
            { y: 0, color: "#424242", toolTipContent: null }
          ]
        }
      ]
    });
  };







  // CanvasJS spline area chart to show pageviews from Jan 2015 - Dec 2015
  var pageViewsSplineAreaChart = new CanvasJS.Chart("page-views-spline-area-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    axisX: {
      gridThickness: 0,
      lineThickness: 0,
      maximum: new Date("1 Dec 2015"),
      minimum: new Date("1 Jan 2015"),
      tickLength: 0,
      valueFormatString: " "
    },
    axisY: {
      gridThickness: 0,
      lineThickness: 0,
      tickLength: 0,
      valueFormatString: " "
    },
    toolTip: {
      backgroundColor: "#ffffff",
      borderThickness: 0,
      cornerRadius: 0,
      fontColor: "#424242"
    },
    data: [
      {
        color: "#424242",
        fillOpacity: 1,
        lineColor: "#ffffff",
        lineThickness: 3,
        markerSize: 0,
        type: "splineArea",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 2171991 },
          { x: new Date("1 Feb 2015"), y: 2678910 },
          { x: new Date("1 Mar 2015"), y: 3215487 },
          { x: new Date("1 Apr 2015"), y: 2213754 },
          { x: new Date("1 May 2015"), y: 2584561 },
          { x: new Date("1 Jun 2015"), y: 3178647 },
          { x: new Date("1 Jul 2015"), y: 3645041 },
          { x: new Date("1 Aug 2015"), y: 2914568 },
          { x: new Date("1 Sep 2015"), y: 3985421 },
          { x: new Date("1 Oct 2015"), y: 3754219 },
          { x: new Date("1 Nov 2015"), y: 3971047 },
          { x: new Date("1 Dec 2015"), y: 4121538 }
        ]
      }
    ]
  });

  // CanvasJS spline area chart to show orders from Jan 2015 - Dec 2015
  var ordersSplineAreaChart = new CanvasJS.Chart("orders-spline-area-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    axisX: {
      gridThickness: 0,
      lineThickness: 0,
      maximum: new Date("1 Dec 2015"),
      minimum: new Date("1 Jan 2015"),
      tickLength: 0,
      valueFormatString: " "
    },
    axisY: {
      gridThickness: 0,
      lineThickness: 0,
      tickLength: 0,
      valueFormatString: " "
    },
    toolTip: {
      backgroundColor: "#ffffff",
      borderThickness: 0,
      cornerRadius: 0,
      fontColor: "#424242"
    },
    data: [
      {
        color: "#424242",
        fillOpacity: 1,
        lineColor: "#ffffff",
        lineThickness: 3,
        markerSize: 0,
        type: "splineArea",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 17376 },
          { x: new Date("1 Feb 2015"), y: 21431 },
          { x: new Date("1 Mar 2015"), y: 25724 },
          { x: new Date("1 Apr 2015"), y: 22138 },
          { x: new Date("1 May 2015"), y: 20676 },
          { x: new Date("1 Jun 2015"), y: 25429 },
          { x: new Date("1 Jul 2015"), y: 29160 },
          { x: new Date("1 Aug 2015"), y: 23317 },
          { x: new Date("1 Sep 2015"), y: 31883 },
          { x: new Date("1 Oct 2015"), y: 30034 },
          { x: new Date("1 Nov 2015"), y: 31768 },
          { x: new Date("1 Dec 2015"), y: 41215 }
        ]
      }
    ]
  });

  // CanvasJS spline area chart to show revenue from Jan 2015 - Dec 2015
  var revenueSplineAreaChart = new CanvasJS.Chart("revenue-spline-area-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    axisX: {
      gridThickness: 0,
      lineThickness: 0,
      maximum: new Date("1 Dec 2015"),
      minimum: new Date("1 Jan 2015"),
      tickLength: 0,
      valueFormatString: " "
    },
    axisY: {
      gridThickness: 0,
      lineThickness: 0,
      tickLength: 0,
      valueFormatString: " "
    },
    toolTip: {
      backgroundColor: "#ffffff",
      borderThickness: 0,
      cornerRadius: 0,
      fontColor: "#424242"
    },
    data: [
      {
        color: "#424242",
        fillOpacity: 1,
        lineColor: "#ffffff",
        lineThickness: 3,
        markerSize: 0,
        type: "splineArea",
        yValueFormatString: "$###,###.##",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 868800 },
          { x: new Date("1 Feb 2015"), y: 1071550 },
          { x: new Date("1 Mar 2015"), y: 1286200 },
          { x: new Date("1 Apr 2015"), y: 1106900 },
          { x: new Date("1 May 2015"), y: 1033800 },
          { x: new Date("1 Jun 2015"), y: 1017160 },
          { x: new Date("1 Jul 2015"), y: 1458000 },
          { x: new Date("1 Aug 2015"), y: 1165850 },
          { x: new Date("1 Sep 2015"), y: 1594150 },
          { x: new Date("1 Oct 2015"), y: 1501700 },
          { x: new Date("1 Nov 2015"), y: 1588400 },
          { x: new Date("1 Dec 2015"), y: 1648600 }
        ]
      }
    ]
  });

  // CanvasJS doughnut chart to show annual users - new and returning
  var usersDoughnutChart = new CanvasJS.Chart("users-doughnut-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    toolTip: {
      backgroundColor: "#000000",
      borderThickness: 2,
      cornerRadius: 0,
      fontColor: "#ffffff",
      contentFormatter: function (e) {
        return e.entries[0].dataPoint.name + ": " + CanvasJS.formatNumber(e.entries[0].dataPoint.y, '###,###') + " - "  + "%"; // calcuting and showing percentage of users inside tooltip
      }
    },
    data: [
      {
        innerRadius: "82%",
        radius: "100%",
        showInLegend: false,
        startAngle: 180,
        type: "doughnut",
        dataPoints: [
          { y: 60, name: "Comeback", color: "#c70000" },
          { y: 40, name: "Regular", color: "#00c700", exploded: true }
        ]
      }
    ]
  });

  // CanvasJS spline chart to show users - new and returning from Jan 2015 - Dec 2015
  var usersSplineChart = new CanvasJS.Chart("users-spline-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    axisX: {
      gridThickness: 0,
      labelFontColor: "#bbbbbb",
      lineColor: "#bbbbbb"
    },
    axisY: {
      gridThickness: 0,
      labelFontColor: "#bbbbbb",
      lineColor: "#bbbbbb"
    },
    legend: {
      dockInsidePlotArea: true,
      fontColor: "#ffffff",
      fontSize: 16,
      horizontalAlign: "right",
      verticalAlign: "top"
    },
    toolTip: {
      backgroundColor: "#000000",
      borderThickness: 2,
      cornerRadius: 0,
      fontColor: "#ffffff",
      shared: true
    },
    data: [
      {
        color: "#c70000",
        legendMarkerType: "square",
        legendText: "Comeback",
        name: "Comeback",
        showInLegend: true,
        type: "spline",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 325799 },
          { x: new Date("1 Feb 2015"), y: 401837 },
          { x: new Date("1 Mar 2015"), y: 482323 },
          { x: new Date("1 Apr 2015"), y: 332063 },
          { x: new Date("1 May 2015"), y: 387684 },
          { x: new Date("1 Jun 2015"), y: 476797 },
          { x: new Date("1 Jul 2015"), y: 546756 },
          { x: new Date("1 Aug 2015"), y: 437186 },
          { x: new Date("1 Sep 2015"), y: 597813 },
          { x: new Date("1 Oct 2015"), y: 563133 },
          { x: new Date("1 Nov 2015"), y: 595657 },
          { x: new Date("1 Dec 2015"), y: 618231 }
        ]
      },
      {
        color: "#00c700",
        legendMarkerType: "square",
        legendText: "Regular Trip",
        name: "Regular Trip",
        showInLegend: true,
        type: "spline",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 108599 },
          { x: new Date("1 Feb 2015"), y: 133945 },
          { x: new Date("1 Mar 2015"), y: 160774 },
          { x: new Date("1 Apr 2015"), y: 110688 },
          { x: new Date("1 May 2015"), y: 129228 },
          { x: new Date("1 Jun 2015"), y: 158932 },
          { x: new Date("1 Jul 2015"), y: 182252 },
          { x: new Date("1 Aug 2015"), y: 145728 },
          { x: new Date("1 Sep 2015"), y: 199271 },
          { x: new Date("1 Oct 2015"), y: 187711 },
          { x: new Date("1 Nov 2015"), y: 198552 },
          { x: new Date("1 Dec 2015"), y: 206077 }
        ]
      }
    ]
  });

  // CanvasJS bar chart to show country wise annual users percentage
  var usersCountriesBarChart = new CanvasJS.Chart("users-countries-bar-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    axisX: {
      labelFontColor: "#f7f6f6",
      labelFontSize: 18,
      lineThickness: 0,
      tickThickness: 0
    },
    axisY: {
      gridThickness: 0,
      lineThickness: 0,
      tickThickness: 0,
      valueFormatString: " "

    },
    toolTip: {
      backgroundColor: "#ffffff",
      borderThickness: 0,
      cornerRadius: 0,
      fontColor: "#424242",
      contentFormatter: function (e) {
        return e.entries[0].dataPoint.label + ": " +  CanvasJS.formatNumber(Math.round(e.entries[0].dataPoint.y / 100 * 500), '###,###'); // calculating and showing country wise number of users inside tooltip
      }
    },
    data: [
      {
        color: "#424242",
        indexLabelFontColor: "#f7f6f6",
        indexLabelFontFamily: "calibri",
        indexLabelFontSize: 18,
        indexLabelPlacement: "outside",
        type: "bar",
        dataPoints: [
          { y: 2,  indexLabel: "2%",  label: "Others" },
          { y: 4,  indexLabel: "4%",  label: "Glass-Component" },
          { y: 5,  indexLabel: "5%",  label: "Packing System" },
          { y: 12, indexLabel: "12%", label: "Lights" },
          { y: 9,  indexLabel: "9%",  label: "Quick Svc" },
          { y: 10, indexLabel: "10%", label: "Gauge Instr Pnl" },
          { y: 14, indexLabel: "14%", label: "Tire Service" },
          { y: 44, indexLabel: "44%", label: "Brake Maintenance System" }
        ]
      }
    ]
  });

  // jQuery.scrollSpeed(100, 400); // for smooth mouse wheel scrolling

  // jQuery.inview plugin
  $('.inview').one('inview', function (e, isInView) {
    if (isInView) {
      switch (this.id) {
        case "sales-doughnut-chart-us": salesDoughnutChartUS.render();
          break;
        case "sales-doughnut-chart-nl": salesDoughnutChartNL.render();
          break;
        case "sales-doughnut-chart-de": salesDoughnutChartDE.render();
          break;
        case "page-views-spline-area-chart": pageViewsSplineAreaChart.render();
          break;
        case "orders-spline-area-chart": ordersSplineAreaChart.render();
          break;
        case "revenue-spline-area-chart": revenueSplineAreaChart.render();
          break;
        case "users-doughnut-chart": usersDoughnutChart.render();
          break;
        case "users-spline-chart": usersSplineChart.render();
          break;
        case "users-countries-bar-chart": usersCountriesBarChart.render();
          break;
      }
    }
  });

});
