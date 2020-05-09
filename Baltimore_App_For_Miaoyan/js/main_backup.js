
$(function () {
  document.getElementById("date").innerHTML = Date();
  // List of date each past month
  var date_month = []
  for (i = 0; i < 13; i++) {
    var date_1 = new Date();
    date_1.setMonth(date_1.getMonth() - 11 + i);
    date_month.push(date_1);
  }
  // List of date each past week
  var date_week = []
  for (i = 0; i < 5; i++) {
    var date_1 = new Date();
    date_1.setDate(date_1.getDate() - 28 + i*7);
    date_week.push(date_1);
  }

// Search Bar (with react search selection drop box)
  var uniqueIDs = _.unique(_.map(data_1, function(f) { return f.EhKey; }));

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  autocomplete(document.getElementById("myInput"), uniqueIDs);


  var risk = 0.1878;
  var risk_text = Math.round(risk * 1000) / 10 + "%";
  var cut_off = 0.28;
  var warranty = 6;
  var id_n = 0;
  var totalRevenue = 45000,
      totalUsers = 7687036;

// Reset all plot after clicking the search button
  $("#id_search").click(function(e) {
    var id = $('#myInput').val();
    var id_n;
    var flag = 0;
    for(var i = 0; i<data_1.length; i++){
      if(data_1[i].EhKey == id){
        risk = data_1[i].Probs;
        id_n = i;
        $("#vehicle_id").text(`Vehicle ID: ${id}`);
        $("#vehicle_dpt").text(`Department: ${data_1[i].EqcDesc}`);
        $("#vehicle_make").text(`MAKE: ${data_1[i].Make}`);
        $("#vehicle_model").text(`Vehicle ID: ${data_1[i].Model}`);
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
              { y: 100, color: "#00c700", toolTipContent: "We predict next trip to be a Regular Trip <span>" },
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
          text: `${data_1[id_n].EPCycleLength} ${data_1[id_n].CycleDESC}`,
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
              { y: 100, color: "#00c700", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${data_1[id_n].EPCycleLength} ${data_1[id_n].CycleDESC}<span>` },
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
              { y: 100, color: "#c70000", toolTipContent: "We predict next trip to be a Comeback Trip <span>" },
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
          text: `${data_1[id_n].EPCycleLength} ${data_1[id_n].CycleDESC}`,
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
              { y: 100, color: "#c70000", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${data_1[id_n].EPCycleLength} ${data_1[id_n].CycleDESC}<span>` },
              { y: 0, color: "#424242", toolTipContent: null }
            ]
          }
        ]
      });
      salesDoughnutChartUS.render();
      salesDoughnutChartNL.render();
      salesDoughnutChartDE.render();
    };

    var pageViewsSplineAreaChart = new CanvasJS.Chart("page-views-spline-area-chart", {
      animationEnabled: true,
      backgroundColor: "transparent",
      axisX: {
        gridThickness: 0,
        lineThickness: 0,
        maximum: date_month[12],
        minimum: date_month[0],
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
            { x: date_month[0], y: data_1[id_n].cost_month_13_a },
            { x: date_month[1], y: data_1[id_n].cost_month_12_a },
            { x: date_month[2], y: data_1[id_n].cost_month_11_a },
            { x: date_month[3], y: data_1[id_n].cost_month_10_a },
            { x: date_month[4], y: data_1[id_n].cost_month_9_a },
            { x: date_month[5], y: data_1[id_n].cost_month_8_a },
            { x: date_month[6], y: data_1[id_n].cost_month_7_a },
            { x: date_month[7], y: data_1[id_n].cost_month_6_a },
            { x: date_month[8], y: data_1[id_n].cost_month_5_a },
            { x: date_month[9], y: data_1[id_n].cost_month_4_a },
            { x: date_month[10], y: data_1[id_n].cost_month_3_a },
            { x: date_month[11], y: data_1[id_n].cost_month_2_a },
            { x: date_month[12], y: data_1[id_n].cost_month_1_a }
          ]
        }
      ]
    });
    pageViewsSplineAreaChart.render();
    $("#number_1").text(`$ ${Math.round(data_1[id_n].cost_month_1_a)}`);

    var ordersSplineAreaChart = new CanvasJS.Chart("orders-spline-area-chart", {
      animationEnabled: true,
      backgroundColor: "transparent",
      axisX: {
        gridThickness: 0,
        lineThickness: 0,
        maximum: date_week[4],
        minimum: date_week[0],
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
            { x: date_week[0], y: data_1[id_n].cost_week_5_a },
            { x: date_week[1], y: data_1[id_n].cost_week_4_a },
            { x: date_week[2], y: data_1[id_n].cost_week_3_a },
            { x: date_week[3], y: data_1[id_n].cost_week_2_a },
            { x: date_week[4], y: data_1[id_n].cost_week_1_a }
          ]
        }
      ]
    });
    ordersSplineAreaChart.render();
    $("#number_2").text(`$ ${Math.round(data_1[id_n].cost_week_1_a)}`);

    var revenueSplineAreaChart = new CanvasJS.Chart("revenue-spline-area-chart", {
      animationEnabled: true,
      backgroundColor: "transparent",
      axisX: {
        gridThickness: 0,
        lineThickness: 0,
        maximum: date_month[12],
        minimum: date_month[1],
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
            { x: date_month[1], y: data_1[id_n].Meancost_1 },
            { x: date_month[2], y: data_1[id_n].Meancost_2 },
            { x: date_month[3], y: data_1[id_n].Meancost_3 },
            { x: date_month[4], y: data_1[id_n].Meancost_4 },
            { x: date_month[5], y: data_1[id_n].Meancost_5 },
            { x: date_month[6], y: data_1[id_n].Meancost_6 },
            { x: date_month[7], y: data_1[id_n].Meancost_7 },
            { x: date_month[8], y: data_1[id_n].Meancost_8 },
            { x: date_month[9], y: data_1[id_n].Meancost_9 },
            { x: date_month[10], y: data_1[id_n].Meancost_10 },
            { x: date_month[11], y: data_1[id_n].Meancost_11 },
            { x: date_month[12], y: data_1[id_n].Meancost_12 }
          ]
        }
      ]
    });
    revenueSplineAreaChart.render();
    $("#number_3").text(`$ ${Math.round(data_1[id_n].Meancost_6)}`);

    var comeback_not_sum=data_1[id_n].Comeback_Not_1+data_1[id_n].Comeback_Not_2+data_1[id_n].Comeback_Not_3+data_1[id_n].Comeback_Not_4+
    data_1[id_n].Comeback_Not_5+data_1[id_n].Comeback_Not_6+data_1[id_n].Comeback_Not_7+data_1[id_n].Comeback_Not_8+data_1[id_n].Comeback_Not_9+
    data_1[id_n].Comeback_Not_10+data_1[id_n].Comeback_Not_11+data_1[id_n].Comeback_Not_12;

    var comeback_sum=data_1[id_n].Comeback_1+data_1[id_n].Comeback_2+data_1[id_n].Comeback_3+data_1[id_n].Comeback_4+
    data_1[id_n].Comeback_5+data_1[id_n].Comeback_6+data_1[id_n].Comeback_7+data_1[id_n].Comeback_8+data_1[id_n].Comeback_9+
    data_1[id_n].Comeback_10+data_1[id_n].Comeback_11+data_1[id_n].Comeback_12;

    var percentage_comback = comeback_sum/(comeback_not_sum+comeback_sum)*100

    var usersDoughnutChart = new CanvasJS.Chart("users-doughnut-chart", {
      animationEnabled: true,
      backgroundColor: "transparent",
      toolTip: {
        backgroundColor: "#000000",
        borderThickness: 2,
        cornerRadius: 0,
        fontColor: "#ffffff",
        contentFormatter: function (e) {
          return e.entries[0].dataPoint.name + ": " + CanvasJS.formatNumber(e.entries[0].dataPoint.y, '###,###')  + "%"; // calcuting and showing percentage of users inside tooltip
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
            { y: Math.round(100-percentage_comback), name: "Regular", color: "#00c700", exploded: true },
            { y: Math.round(percentage_comback), name: "Comeback", color: "#c70000" }
          ]
        }
      ]
    });
    usersDoughnutChart.render();

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
          color: "#00c700",
          legendMarkerType: "square",
          legendText: "Regular Trip",
          name: "Regular Trip",
          showInLegend: true,
          type: "spline",
          dataPoints: [
            { x: date_month[0], y: data_1[id_n].Comeback_Not_1 },
            { x: date_month[1], y: data_1[id_n].Comeback_Not_2 },
            { x: date_month[2], y: data_1[id_n].Comeback_Not_3 },
            { x: date_month[3], y: data_1[id_n].Comeback_Not_4 },
            { x: date_month[4], y: data_1[id_n].Comeback_Not_5 },
            { x: date_month[5], y: data_1[id_n].Comeback_Not_6 },
            { x: date_month[6], y: data_1[id_n].Comeback_Not_7 },
            { x: date_month[7], y: data_1[id_n].Comeback_Not_8 },
            { x: date_month[8], y: data_1[id_n].Comeback_Not_9 },
            { x: date_month[9], y: data_1[id_n].Comeback_Not_10 },
            { x: date_month[10], y: data_1[id_n].Comeback_Not_11 },
            { x: date_month[11], y: data_1[id_n].Comeback_Not_12 }
          ]
        },
        {
          color: "#c70000",
          legendMarkerType: "square",
          legendText: "Comeback",
          name: "Comeback",
          showInLegend: true,
          type: "spline",
          dataPoints: [
            { x: date_month[0], y: data_1[id_n].Comeback_1 },
            { x: date_month[1], y: data_1[id_n].Comeback_2 },
            { x: date_month[2], y: data_1[id_n].Comeback_3 },
            { x: date_month[3], y: data_1[id_n].Comeback_4 },
            { x: date_month[4], y: data_1[id_n].Comeback_5 },
            { x: date_month[5], y: data_1[id_n].Comeback_6 },
            { x: date_month[6], y: data_1[id_n].Comeback_7 },
            { x: date_month[7], y: data_1[id_n].Comeback_8 },
            { x: date_month[8], y: data_1[id_n].Comeback_9 },
            { x: date_month[9], y: data_1[id_n].Comeback_10 },
            { x: date_month[10], y: data_1[id_n].Comeback_11 },
            { x: date_month[11], y: data_1[id_n].Comeback_12 }
          ]
        }

      ]
    });
    usersSplineChart.render();

    var part_sum = data_1[id_n].Others+data_1[id_n].Engine+data_1[id_n].Glass+data_1[id_n].Hydraulic+
    data_1[id_n].Electrical+data_1[id_n].Cranking+data_1[id_n].AC+data_1[id_n].Brakes+
    data_1[id_n].Fuel+data_1[id_n].Unit+data_1[id_n].Quick+data_1[id_n].Tire+data_1[id_n].Light;

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
          return e.entries[0].dataPoint.label + ": " +  CanvasJS.formatNumber(Math.round(e.entries[0].dataPoint.y), '###,###'); // calculating and showing country wise number of users inside tooltip
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
          // { y: data_1[id_n].Engine,  indexLabel: `${Math.round(data_1[id_n].Engine/part_sum*100)}%`,  label: "Engine" },
          //   { y: data_1[id_n].Glass,  indexLabel: `${Math.round(data_1[id_n].Glass/part_sum*100)}%`,  label: "Glass-Component" },
            { y: data_1[id_n].Hydraulic,  indexLabel: `${Math.round(data_1[id_n].Hydraulic/part_sum*100)}%`,  label: "Hydraulic Sys" },
            { y: data_1[id_n].Electrical, indexLabel: `${Math.round(data_1[id_n].Electrical/part_sum*100)}%`, label: "Electrical" },
            { y: data_1[id_n].Cranking,  indexLabel: `${Math.round(data_1[id_n].Cranking/part_sum*100)}%`,  label: "Cranking System" },
            { y: data_1[id_n].AC, indexLabel: `${Math.round(data_1[id_n].AC/part_sum*100)}%`, label: "Air Conditioning" },
            { y: data_1[id_n].Brakes, indexLabel: `${Math.round(data_1[id_n].Brakes/part_sum*100)}%`, label: "Brakes" },
            { y: data_1[id_n].Fuel, indexLabel: `${Math.round(data_1[id_n].Fuel/part_sum*100)}%`, label: "Fuel System" },
            { y: data_1[id_n].Unit,  indexLabel: `${Math.round(data_1[id_n].Unit/part_sum*100)}%`,  label: "Unit Services" },
            { y: data_1[id_n].Quick, indexLabel: `${Math.round(data_1[id_n].Quick/part_sum*100)}%`, label: "Quick Svc Item" },
            { y: data_1[id_n].Tire, indexLabel: `${Math.round(data_1[id_n].Tire/part_sum*100)}%`, label: "Tire Service" },
            { y: data_1[id_n].Light, indexLabel: `${Math.round(data_1[id_n].Light/part_sum*100)}%`, label: "Light System" }
          ]
        }
      ]
    });
    usersCountriesBarChart.render();



  });




  // The orininal page without typing in the information

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
        text: "6 MONTHS",
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
            { y: 100, color: "#00c700", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${warranty} MONTHS<span>` },
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
        text: "6 MONTHS",
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
            { y: 100, color: "#c70000", toolTipContent: `The EPCycle or Warranty for this particular Vehicle & Part is ${warranty} MONTHS<span>` },
            { y: 0, color: "#424242", toolTipContent: null }
          ]
        }
      ]
    });
  };



  // Get date of past 12 month


  // CanvasJS spline area chart to show pageviews from Jan 2015 - Dec 2015
  var pageViewsSplineAreaChart = new CanvasJS.Chart("page-views-spline-area-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    axisX: {
      gridThickness: 0,
      lineThickness: 0,
      maximum: date_month[11],
      minimum: date_month[0],
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
          { x: date_month[0], y: 2171991 },
          { x: date_month[1], y: 2678910 },
          { x: date_month[2], y: 3215487 },
          { x: date_month[3], y: 2213754 },
          { x: date_month[4], y: 2584561 },
          { x: date_month[5], y: 3178647 },
          { x: date_month[6], y: 3645041 },
          { x: date_month[7], y: 2914568 },
          { x: date_month[8], y: 3985421 },
          { x: date_month[9], y: 3754219 },
          { x: date_month[10], y: 3971047 },
          { x: date_month[11], y: 4121538 }
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
      maximum: date_week[4],
      minimum: date_week[0],
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
          { x: date_week[0], y: 17376 },
          { x: date_week[1], y: 21431 },
          { x: date_week[2], y: 25724 },
          { x: date_week[3], y: 22138 },
          { x: date_week[4], y: 20676 }
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
      maximum: date_week[4],
      minimum: date_week[0],
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
          { x: date_week[0], y: 1071550 },
          { x: date_week[1], y: 1286200 },
          { x: date_week[2], y: 1106900 },
          { x: date_week[3], y: 1017160 },
          { x: date_week[4], y: 1458000 }
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
          { y: 40, name: "Regular", color: "#00c700", exploded: true },
          { y: 60, name: "Comeback", color: "#c70000" }
        ]
      }
    ]
  });


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
        color: "#00c700",
        legendMarkerType: "square",
        legendText: "Regular Trip",
        name: "Regular Trip",
        showInLegend: true,
        type: "spline",
        dataPoints: [
          { x: date_month[0], y: 108599 },
          { x: date_month[1], y: 133945 },
          { x: date_month[2], y: 160774 },
          { x: date_month[3], y: 110688 },
          { x: date_month[4], y: 129228 },
          { x: date_month[5], y: 158932 },
          { x: date_month[6], y: 182252 },
          { x: date_month[7], y: 145728 },
          { x: date_month[8], y: 199271 },
          { x: date_month[9], y: 187711 },
          { x: date_month[10], y: 198552 },
          { x: date_month[11], y: 206077 }
        ]
      },
      {
        color: "#c70000",
        legendMarkerType: "square",
        legendText: "Comeback",
        name: "Comeback",
        showInLegend: true,
        type: "spline",
        dataPoints: [
          { x: date_month[0], y: 325799 },
          { x: date_month[1], y: 401837 },
          { x: date_month[2], y: 482323 },
          { x: date_month[3], y: 332063 },
          { x: date_month[4], y: 387684 },
          { x: date_month[5], y: 476797 },
          { x: date_month[6], y: 546756 },
          { x: date_month[7], y: 437186 },
          { x: date_month[8], y: 597813 },
          { x: date_month[9], y: 563133 },
          { x: date_month[10], y: 595657 },
          { x: date_month[11], y: 618231 }
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
