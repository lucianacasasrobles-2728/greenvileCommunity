// Load JSON file and start processing the data
function loadData() {
    fetch('data/website_data.json')
        .then(function(response) {
            return response.json(); // Convert JSON to JavaScript object
        })
        .then(function(data) {
            displayData(data); // Display data on the page
        })
        .catch(function(error) {
            console.log('Error loading data: ' + error);
        });
}


// Display all sections: pool, actions, goals, trades
function displayData(data) {

    /* -------------------------------
       COMMUNAL POINTS POOL
    --------------------------------*/
    document.getElementById('communalPool').textContent = data.communalPointsPool;



    /* -------------------------------
       GREEN ACTIONS (CARD FORMAT)
    --------------------------------*/
    var greenActionsDiv = document.getElementById('greenActions');
    greenActionsDiv.innerHTML = '';

    for (var i = 0; i < data.greenActions.length; i++) {
        var action = data.greenActions[i];
        var div = document.createElement('div');
        div.classList.add('card'); // 💚 Apply card style

        div.innerHTML = `
            <h3>${action.title}</h3>
            <p>${action.description}</p>
        `;

        if (action.picture) {
            div.innerHTML += `<img src="${action.picture}" width="200">`;
        }

        greenActionsDiv.appendChild(div);
    }



    /* -------------------------------
       COMMUNAL GOALS (CARDS + PROGRESS BAR)
    --------------------------------*/
    var goalsDiv = document.getElementById('communalGoals');
    goalsDiv.innerHTML = '';

    for (var i = 0; i < data.communalGoals.length; i++) {
        var goal = data.communalGoals[i];
        var div = document.createElement('div');
        div.classList.add('card'); // 💚 Apply card style

        // Avoid NaN if pointsNeeded = 0
        var progress = goal.pointsNeeded === 0 
            ? 0 
            : Math.round((goal.currentPoints / goal.pointsNeeded) * 100);

        div.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <p><strong>Progress:</strong> ${goal.currentPoints} / ${goal.pointsNeeded} (${progress}%)</p>

            <!-- Progress bar -->
            <progress value="${goal.currentPoints}" max="${goal.pointsNeeded}"></progress>
        `;

        // If goal is completed
        if (goal.completed) {
            div.innerHTML += `<p><strong>COMPLETED ✔</strong></p>`;
        }

        // List of tasks
        if (goal.tasks.length > 0) {
            div.innerHTML += `<h4>Tasks:</h4><ul>`;
            for (var j = 0; j < goal.tasks.length; j++) {
                var task = goal.tasks[j];
                var status = task.completed ? ' (Done)' : '';
                div.innerHTML += `<li>${task.title}: ${task.description}${status}</li>`;
            }
            div.innerHTML += `</ul>`;
        }

        goalsDiv.appendChild(div);
    }



    /* -------------------------------
       TRADES (CARD FORMAT)
    --------------------------------*/
    var tradesDiv = document.getElementById('trades');
    tradesDiv.innerHTML = '';

    for (var i = 0; i < data.trades.length; i++) {
        var trade = data.trades[i];
        var div = document.createElement('div');
        div.classList.add('card'); // 💚 Apply card style

        div.innerHTML = `
            <h3>${trade.title}</h3>
            <p>${trade.description}</p>
            <p><strong>Cost:</strong> ${trade.pointsCost} points</p>
        `;

        if (trade.picture) {
            div.innerHTML += `<img src="${trade.picture}" width="200">`;
        }

        tradesDiv.appendChild(div);
    }
}


// Start loading data when page opens
loadData();