
function temperatureFromTable(t){
	let obj = {};
	obj.description = t.querySelector("caption").textContent;
	obj.months = [];
	obj.temperatures = [];
	
	let th = t.querySelectorAll("thead>tr>th");
	
	for(let i = 0; i < th.length; i++){
		obj.months.push(th[i].textContent);
	}
	
	
	
	let tr = t.querySelectorAll("tbody>tr");
	for(let i = 0; i < tr.length; i++){
		objTemp = {};
		objTemp.temperatures = [];
		
		objTemp.location = tr[i].querySelector("th").textContent;
		let listTd = tr[i].getElementsByTagName("td");
		
		for(let j = 0; j < listTd.length; j++){
			objTemp.temperatures.push(listTd[j].textContent);
		}
		
		obj.temperatures.push(objTemp);	
	}
	
	return obj;
}


function temperaturesOfPage(){
	let table = document.getElementById("tempvilles");
	return temperatureFromTable(table);
}

function newColors(n){
	let couleurs = [];
	for(let i = 0; i < n; i++){
		couleurs.push("hsl(" + i*360/n + ", 97%, 42%)");
	}
	return couleurs;
}

function temperaturesDatasetsFrom(temp, colors){
	
	let datasets = [];
	
	for(let i = 0; i < temp.temperatures.length; i++){
		let obj = {};
		obj.label = temp.temperatures[i].location;
		obj.data = temp.temperatures[i].temperatures;
		obj.borderColor = colors[i];
		datasets.push(obj);
	}
	
	return datasets;
}

function temperaturesChartFrom(temperatures, ctx, colors){
	
	let myChart = {};
	
	//data
	let data = {};
	data.labels = temperatures.months;
	data.datasets = temperaturesDatasetsFrom(temperatures, colors);
	
	//options
	let options = {};
	
	let title = {
		display: true,
		text: "description"
	};
	
	let datasets = {};
	
	let line = {
		lineTension: 0, 
		fill: false
	};
	
	datasets.line = line;
	
	options.title = title;
	options.datasets = datasets;
	options.responsive = false;
	
	// final object
	myChart.type = "line";
	myChart.data = data;
	myChart.options = options;
		
	return new Chart(ctx, myChart);
}

function displayTemperaturesChart(t){

	const ctx = document.getElementById('myChart').getContext('2d');

	let chart = temperaturesChartFrom(t, ctx, newColors(t.temperatures.length));
}

let tempTable = temperaturesOfPage();

displayTemperaturesChart(tempTable);









