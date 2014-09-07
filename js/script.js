   
// Chart dimensions.
var w = 550,
h = 520,
r1 = Math.min(w, h) / 2 - 4,
r0 = r1 - 20,
format = d3.format(",.3r");
 
// Square matrices, asynchronously loaded; destination is the transpose of provOrigin.
var provOrigin = [],
destination = [];
 
// The chord layout, for computing the angles of chords and groups.
var layout = d3.layout.chord()
  .sortGroups(d3.descending)
  .sortSubgroups(d3.descending)
  .sortChords(d3.descending)
  .padding(.04);

//shuffle the colors
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


colors = ['#308C95','#F5E14D','#F59C4D','#653FA7',
          '#AA3AA7','#00353A','#5F2D00','#190341',
          '#4DE385','#38B265','#F56A4D','#F5CC4D'];
//colors = shuffle(colors);

var fill = d3.scale.ordinal()
  .domain([0, 1, 2])
  .range(colors);

 console.log(layout);
 
// The arc generator, for the groups.
var arc = d3.svg.arc()
.innerRadius(r0)
.outerRadius(r1);
 
// The chord generator (quadratic Bézier), for the chords.
var chord = d3.svg.chord()
.radius(r0);
 
// Add an SVG element for each diagram, and translate the origin to the center.
var svg = d3.select("section.origine").selectAll("div")
  .data([provOrigin, destination])
  .enter().append("div")
  .attr("class", "sibling-1 animated bounceIn")
  .style("display", "inline-block")
  .style("width", w + "px")
  .style("height", h + "px")
  .append("svg:svg")
  .attr("width", w)
  .attr("height", h)
  .append("svg:g")
  .attr("id", "circle")
  .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
 

// Load our data file…
d3.csv("https://gist.githubusercontent.com/guinslym/d81d1a7786a867b616c6/raw/8dd1ca4ddf34e01789d4326c4e1eab49e0fa2d50/interprovince.csv", function(data) {
  var provinces = {},
  array = [],
  n = 0;
 

  // Compute a unique id for each country.
  data.forEach(function(d) {
  d.provOrigin = country(d.provOrigin);
  d.destination = country(d.destination);
  d.destination.nbr_pourcentage = d.nbr_pourcentage;
  d.valueOf = value; // convert object to number implicitly
  });
 
  /*********************
        MATRIX
  *********************/
  //how come 'n' is < 0
  //console.log("n value= 13 provinces" + n);
  // Initialize a square matrix of provOrigin and destination.
  for (var i = 0; i < n; i++) {
    provOrigin[i] = [];
    destination[i] = [];
      for (var j = 0; j < n; j++) {
        provOrigin[i][j] = 0;
        destination[i][j] = 0;
        }
  }

  //console.log("matrix-provOrigin: " + provOrigin);
  //console.log("matrix-destination: " + destination);
   
  // Populate the matrices, and stash a map from id to country.
  data.forEach(function(d) {
  provOrigin[d.provOrigin.id][d.destination.id] = d;
  destination[d.destination.id][d.provOrigin.id] = d;
  array[d.provOrigin.id] = d.provOrigin;
  array[d.destination.id] = d.destination;
  //console.log(array[d.destination.id]);
  });
 
  // For each diagram…
  svg.each(function(matrix, j) {
  var svg = d3.select(this);
   
   console.log("hello");
  // Compute the chord layout.
  layout.matrix(matrix);
   

  var les_provinces_fr = ["Alberta", "Colombie-britannique", "Manitoba",
                      "Nouveau Brunswick", "Terre-Neuve-et-Labrador",
                      "Nouvelle-Écosse", "Nunavut", "Ontario", "Île du Prince-Éduard",
                      "Québec", "Saskatchewan", "Yukon"];
  var abbreviations = ["AB", "BC", "MB",
                      "NB", "NL", "NS",
                      "NT", "NU", "ON",
                      "PE","QC", "SK", "YK"];
//fonction find the province name


  // Add chords.
  svg.selectAll("path.chord")
  .data(layout.chords)
  .enter().append("svg:path")
  .attr("class", "chord")
  .style("fill", function(d) { return fill(d.source.value.nbr_pourcentage); })
  .style("stroke", function(d) { return d3.rgb(fill(d.source.value.nbr_pourcentage)).darker(); })
  .attr("d", chord)
  .append("svg:title")
  .text(function(d) { return d.source.value +  " résidents " + trouver_le_nom_de_la_province_avec_article_de(d.source.value.provOrigin.name) + " résident maintenant en " +  d.source.value.destination.name ; });
   
  // Add groups.
  var g = svg.selectAll("g.group")
  .data(layout.groups)
  .enter().append("svg:g")
  .attr("class", "group")
   .on("mouseover", mouseover);//on and out of the circle
   

  // Add the group arc.
  g.append("svg:path")
  .style("fill", function(d) { return fill(array[d.index].nbr_pourcentage); })
  .attr("id", function(d, i) { return "group" + d.index + "-" + j; })
  .attr("d", arc)
  .append("svg:title")
  .text(function(d) { 
      if (j) {
         return "En 2013, " + trouver_le_nom_de_la_province(array[d.index].name) + " " + "a accueillie" + " " + format(d.value) + " migrants"; 
      }else{
        return format(d.value) + " résidents " + trouver_le_nom_de_la_province_avec_article_de(array[d.index].name) + " ont changé \nde province de résidence "+ "en 2013 " ;
      }
     
    });

  //what is j in the previous block
    //console.log("what is j? " + j);
    //j = 0 first diagram (left)
    //j = 1 right diagramm (province de destination)
  // Add the group label (but only for large groups, where it will fit).
  // An alternative labeling mechanism would be nice for the small groups.

  g.append("svg:text")
  .attr("x", 6)
  .attr("dy", 15)
  .filter(function(d) { return d.value > 110; })
  .append("svg:textPath")
  .attr("xlink:href", function(d) { return "#group" + d.index + "-" + j; })
  .text(function(d) { 
    if (d.value<5000){return "";}
    return array[d.index].name; });
  }, remove_first_diagram());

  var chordPaths = svg.selectAll("path.chord")
    .on("mouseover", function (d) {
      //console.log('mouseIn');
    })
    .on("mouseout", 
      function (d) { 
        //console.log('mouseOut');
       });

  function mouseover(d, i) {
      chordPaths.classed("fade", function(p) {
        return p.source.index != i
            && p.target.index != i;
      });
    }

  function remove_first_diagram(){
    les_diagrams = $(".sibling-1");
    //console.log(les_diagrams);
    les_diagrams.first().appendTo(".origine");
    les_diagrams.last().appendTo(".destination");
  }
 
  // Memoize the specified province, computing a unique id.
  function country(d) {
    return provinces[d] || (provinces[d] = {
      name: d,
      id: n++
    });
  }
 
// Converts a debit object to its primitive numeric value.
  function value() {
  return +this.total;
  }
  });
 
