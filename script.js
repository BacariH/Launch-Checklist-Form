const form = document.querySelector('#launchForm');
const formBtn = document.querySelector('#formSubmit');
const launchStatus = document.querySelector('#launchStatus');
const fuelStatus = document.querySelector('#fuelStatus');
const cargoStatus = document.querySelector('#cargoStatus');
let missionTarget = document.querySelector('#missionTarget');
let randomPlanetNumber = Math.floor(Math.random() * Math.floor(7));

async function getPlanets() {
   try{
      let res = await fetch('https://handlers.education.launchcode.org/static/planets.json');
      let data = await res.json();
      for(let i = 0; i < data.length; i++){
                  let html = '';
                  html = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${data[randomPlanetNumber].name}</li>
                     <li>Diameter: ${data[randomPlanetNumber].diameter}</li>
                     <li>Star: ${data[randomPlanetNumber].star}</li>
                     <li>Distance from Earth: ${data[randomPlanetNumber].distance}</li>
                     <li>Number of Moons: ${data[randomPlanetNumber].moons}</li>
                  </ol>
                  <img src="${data[randomPlanetNumber].image}">
                  `;
                  missionTarget.innerHTML = html;
               }
   } catch(err){
      console.log(err)
   }

}

window.addEventListener('load', () => {
   form.addEventListener('submit', (e) => {
      let pilotName = document.querySelector('input[name="pilotName"').value;
      let coPilotName = document.querySelector('input[name="copilotName"').value;
      let fuelLevel = parseInt(document.querySelector('input[name="fuelLevel"').value);
      let cargoMass = parseInt(document.querySelector('input[name="cargoMass"').value);
      

      if(pilotName === "" || coPilotName === "" || fuelLevel === "" || cargoMass === ""){
         alert('Please enter some data below.')
      } else {
         
         let faultyItems = document.querySelector('#faultyItems');
         let pilotStatus = document.querySelector('#pilotStatus');
         let coPilotStatus = document.querySelector('#copilotStatus');
         
         getPlanets();
            
         pilotStatus.textContent = `${pilotName} is ready for launch.`;
         coPilotStatus.textContent = `${coPilotName} is ready for launch.`;

         if(fuelLevel < 10000 || cargoMass === ''){
            faultyItems.style.visibility = 'visible';
            launchStatus.textContent = "Shuttle not ready for launch.";
            launchStatus.style.color = 'red';
            fuelStatus.textContent = 'Fuel is too low to launch.';
         }else if(cargoMass > 10000 || cargoMass === ''){
            faultyItems.style.visibility = 'visible';
            launchStatus.textContent = "Shuttle not ready for launch.";
            launchStatus.style.color = 'red';
            cargoStatus.textContent = 'Shuttle too heavy to launch.';
         } else{
            launchStatus.textContent = 'Shuttle ready for launch';
            launchStatus.style.color = 'green';
            fuelStatus.textContent = 'Fuel level high enough for launch.';
            cargoStatus.textContent = 'Cargo mass is low enough for launch.';
         }
      }
      
      e.preventDefault();
   })
});
