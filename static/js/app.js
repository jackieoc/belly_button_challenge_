const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url, function(error, data) {
  if (error) throw error;
  console.log(data);
});

//
function init() {
  let dropdownMenu = d3.select("#selDataset");

  d3.json(url, function(error, data) {
      if (error) throw error;
      let names = data.names;
      names.forEach((id) => {
          console.log(id);

          dropdownMenu.append("option").text(id).property("value",id);
      });

      let newData = names[0];
      console.log(newData);
      // createScatter(newData);
      createBar(newData);
      createSummary(newData);

  });
};

function createBar(bar) {
  d3.json(url, function(error, data) {
      if (error) throw error;

      let sampleInfo = data.samples;
      let value = sampleInfo.filter(result => result.id == bar);
      let valueData = value[0];
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      console.log(otu_ids,otu_labels,sample_values);

      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      Plotly.newPlot("bar", [trace])
  });
};

function createBubble(bubble) {
  d3.json(url, function(error, data) {
      if (error) throw error;

      let sampleInfo = data.samples;
      let value = sampleInfo.filter(result => result.id == bubble);
      let valueData = value[0];
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      console.log(otu_ids,otu_labels,sample_values);
      
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
          }
      };
      let layout = {
        xaxis: {title: "OTU ID"},
      };

        Plotly.newPlot("bubble", [trace1], layout)
    });
};

function createSummary(summary) {
  d3.json(url, function(error, data) {
      if (error) throw error;

      let metadata = data.metadata;
      let value = metadata.filter(result => result.id == summary);
      console.log(value)

      let valueData = value[0];
      d3.select("#sample-metadata").html("");
      Object.entries(valueData).forEach(([key,value]) => {
          console.log(key,value);
          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};

function optionChanged(newID) { 
  console.log(newID); 
  createBubble(newID)
  createBar(newID)
  createSummary(newID)
};

init();
