const express = require('express')
const app = express()
let isLessThan;
const colors =  [{title: "red", id: 0}, {title: "orange", id: 1}, {title: "yellow", id: 2}, {title: "green", id: 3}, {title: "blue", id: 4}, {title: "purple",
id: 5}, {title: "turquoise", id: 6}, {title: "brown", id: 7}];
let randomInt;
let red = 0, orange = 0, yellow = 0, green = 0, blue = 0, purple = 0, turquoise = 0, brown = 0; 
let lastRandomInt;


app.use(express.json());

app.get("/api", (req, res) => {
    
    function reset(resetable) {
        colors[resetable].title = colors[resetable].title.toLowerCase();
    }

    colors.forEach(color => {
        color.title = color.title.toLowerCase();
    })

    randomInt = Math.floor(Math.random() * 8);

    if (randomInt === lastRandomInt) {
        if (randomInt === 0) {
            randomInt = randomInt + 1;
        }
        else if (randomInt === 7) {
            randomInt = randomInt - 1;
        }
        else {
            randomInt = randomInt - 1;
        }
    }
    
    lastRandomInt = randomInt;
    
    switch(randomInt) {
        case 0:
            
            colors[0].title = colors[0].title.toUpperCase();
            red += 1;
            break;
        case 1:
            
            colors[1].title = colors[1].title.toUpperCase();
            orange += 1;
            break;
        case 2:
            
            colors[2].title = colors[2].title.toUpperCase();  
            yellow += 1;          
            break;
        case 3: 
            
            colors[3].title = colors[3].title.toUpperCase();  
            green += 1;
            break;
        case 4: 
            
            colors[4].title = colors[4].title.toUpperCase(); 
            blue += 1;
            break;
        case 5: 
            
            colors[5].title = colors[5].title.toUpperCase(); 
            purple += 1;
            break;
        case 6: 
            
            colors[6].title = colors[6].title.toUpperCase(); 
            turquoise += 1;
            break;
        case 7: 
            
            colors[7].title = colors[7].title.toUpperCase(); 
            brown += 1;
            break;
            
    }
    res.json({colors})
})

app.post('/api/counter', (req, res) => {
    const { counter } = req.body;
    isLessThan = counter <= 14
    res.json({ isLessThan })
})

app.listen(4000, () => {console.log("Server started on port 4000. yay")})