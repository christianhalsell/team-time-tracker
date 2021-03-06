const roster = [
  {
    id: 1,
    name: 'Isabella',
    number: '7',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },
  {
    id: 2,
    name: 'Samantha',
    number: '8',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 3,
    name: 'Sydney',
    number: '9',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 4,
    name: 'Camden',
    number: '10',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 5,
    name: 'Ayra',
    number: '11',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 6,
    name: 'Elise',
    number: '13',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 7,
    name: 'Rebecca',
    number: '15',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 8,
    name: 'Shiloh',
    number: '17',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 9,
    name: 'Penelope',
    number: '22',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 10,
    name: 'Lam',
    number: '44',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 11,
    name: 'Daniella',
    number: '48',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 12,
    name: 'Ava',
    number: '52',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  },{
    id: 13,
    name: 'Campbell',
    number: '99',
    playing: true,
    firstHalfTime: 0,
    secondHalfTime: 0,
    totalTime: 0
  }
];

// global variables
const tableBody = document.querySelector('#team tbody');
const startButton = document.querySelector('#startButton');
const clock = document.querySelector('#clock');
let startButtonStatus = false;
let gameStart = false;

let gameClock = 0;
const interval = 1000;

const allPlaying = document.getElementById('allPlayingButton');
const allBenched = document.getElementById('allBenchedButton');

// all playing button
allPlaying.addEventListener('click', () => {
  roster.forEach((player) => {
    player.playing = true;
  });

  renderTable();
});

// all benched button
allBenched.addEventListener('click', () => {
  roster.forEach((player) => {
    player.playing = false;
  });

  renderTable();
});

// convert milliseconds to minutes/seconds
const convertTime = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

// toggle player status
const playerActiveButton = (player) => {
  const playerId = parseInt(player.getAttribute('data-player'));
  for (i in roster) {
    if (roster[i].id === playerId) {
      // update State here
      roster[i].playing = roster[i].playing === true ? false : true;

      renderTable();
    }
  }
};

// adds roster to table
const renderTable = () => {
  tableBody.innerHTML = ''; // clear table (this will be better in React)

  roster.forEach((player) => {
    const playerId = player.id;
    const playerName = player.name;
    const playerNumber = player.number;
    const playerTime = player.totalTime;
    const playerPlayButton = player.playing ? 'active' : 'inactive'; 
    const playerPlayButtonText = player.playing ? 'playing' : 'benched'; 
    const tableRow = tableBody.appendChild(document.createElement('tr'));
    

    // add on-bench class to row if needed
    if (playerPlayButton === 'inactive') {
      tableRow.className = 'inactive-row';
    };
    
    tableRow.innerHTML = `
      <td>${playerName}</td>
      <td>${playerNumber}</td>
      <td>${convertTime(playerTime)}</td>
      <td><button class="${playerPlayButton}" data-player="${playerId}" onclick="playerActiveButton(this)">${playerPlayButtonText}</button></td>
    `
  });
};

// run this at the end of each interval
const tick = () => {
  roster.forEach((player) => {
    if (player.playing && startButtonStatus === true) {
      player.totalTime += interval;
    }
  });

  if (startButtonStatus === true) {
    gameClock += interval; 
  }
  clock.innerHTML = convertTime(gameClock);
  
  renderTable();
}

// starts the timer
const startTime = () => {
  setInterval(tick, interval);
};

// Add events to Start Game Clock button
startButton.addEventListener('click', () => {
  if (startButtonStatus === false) {
    if (!gameStart) {
      startTime();
    }
    startButtonStatus = true;
    gameStart = true;
    startButton.innerHTML = 'pause';
 } else {
    startButtonStatus = false;
    startButton.innerHTML = 'play';
  }
});

// Initialize table
renderTable();
