
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//there will be a square field upon which the game will play 
//The size of the board will be 20*15

var board = document.getElementById('Gameboard');
var draw = board.getContext('2d');

//intial map
var map = [0]
i = 0
while (i < 300) {
    map.push(0);
    i = i + 1
}
//the initial length of the 'worm' will be 2
var worm_length = 2

//the initial direction of the 'worm' will be east.
var north = 1;
var east = 2;
var south = 3;
var west = 4;
var worm_direction = east;

//4. the initial position of the head of the 'worm' will be 2 blocks away from the center
worm_head = 20 * 7 + 8;
map[worm_head] = 2;
map[20 * 7 + 7] = 3;

spawn_fruit();
var worm_array = [east, east];
var death = 0
var reset_count = 0
var x = 0;

while (x < 20) {
    draw.fillRect(x * 40 + 5, 15 * 40, 30, 5);
    x = x + 1
}
draw.font = "50px Bold Arial";
draw.fillText("Score :", 10, 650);
draw.fillText("Fruits :", 550, 650);
//5. the initial score will be 0
var score = 0
draw.fillText(score, 173, 650);
draw.fillText(worm_length - 2, 713, 650);
var travel_distance = 0
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//6. the speed will increase as the worm feasts

//7. there will be a maximum length of the worm which will mark the end of the game

function direction() {

    worm_head_x = worm_head % 20
    worm_head_y = parseInt(worm_head / 20)
//13. there are no walls
    if (worm_direction == north) {
        worm_head_y = worm_head_y - 1;
        if (worm_head_y == -1) {
            worm_head_y = 14;
        }
    }
    if (worm_direction == east) {
        worm_head_x = worm_head_x + 1;
        if (worm_head_x == 20) {
            worm_head_x = 0;
        }    
    }
    if (worm_direction == south) {
        worm_head_y = worm_head_y + 1;
        if (worm_head_y == 15) {
            worm_head_y = 0;
        }
    }
    if (worm_direction == west) {
        worm_head_x = worm_head_x - 1;
        if (worm_head_x == -1) {
            worm_head_x = 19;
        }
    }
    worm_head = worm_head_y * 20 + worm_head_x;
//12. if the worm 'eats' itself the game will end
    if (map[worm_head] > 1){
        if (map[worm_head] < worm_length + 1){
            death = 1;
        }
        
    }
//8. the score will increase everytime the worm 'eats' a 'fruit'
    if (map[worm_head] == -1) {
        get_score()
    }
    map[worm_head] = 1;
}

function get_score() {
    map[worm_head] = 1
    if (travel_distance > 200) {
        score = score + 1;
    } else {
        score = score + 201 - travel_distance;
    }
    travel_distance = 0
    worm_length = worm_length + 1
    draw.fillStyle = "White";
    draw.fillRect(173, 610, 300, 50);
    draw.fillRect(713, 610, 300, 50);
    draw.fillStyle = "Black";
    draw.font = "50px Bold Arial";
    draw.fillText(score, 173, 650);
    draw.fillText(worm_length - 2, 713, 650)
    spawn_fruit();
    
    
}


function body_movement() {
    
    i = 0
    while (i < 300) {
        if (map[i] > worm_length) {
            map[i] = 0;
        }
        if (map[i] > 0) {
            map[i] = map[i] + 1;
        }
        i = i + 1
    }
}

function spawn_fruit() {
    k = 0
    while (k == 0){
        fruit_pos_x = parseInt(Math.random() * 20);
        fruit_pos_y = parseInt(Math.random() * 15);
        color = parseInt(Math.random() * 100)
        change = 1
        fruit_pos = fruit_pos_y * 20 + fruit_pos_x;
        if (map[fruit_pos] == 0) {
            map[fruit_pos] = -1;
            break
        }
    }
}


//9. the score increased by eating a fruit will be reduced by every block the 'worm' have traveled
//10. the maximum score that can be increased by 1 fruit will be 50
//11. the minimum score that can be increased by 1 fruit will be 1


//14. the scoreboard will show the length and score


function draw_direction_current(DD) {
    if (DD == north) {
        draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40, 30, 5);
    }
    if (DD == south) {
        draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 35, 30, 5);
    }
    if (DD == east) {
        draw.fillRect(worm_head_x * 40 + 35 , worm_head_y * 40 + 5, 5, 30);
    }
    if (DD == west) {
        draw.fillRect(worm_head_x * 40, worm_head_y * 40 + 5, 5, 30);
    }
}
function draw_direction_previous(DD) {
    if (DD == south) {
        draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40, 30, 10);
    }
    if (DD == north) {
        draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 35, 30, 10);
    }
    if (DD == west) {
        draw.fillRect(worm_head_x * 40 + 35 , worm_head_y * 40 + 5, 10, 30);
    }
    if (DD == east) {
        draw.fillRect(worm_head_x * 40, worm_head_y * 40 + 5, 10, 30);
    }
}


function make_screen() {
    i = 0;
    while (i < 300) {
        worm_head_x = i % 20;
        worm_head_y = parseInt(i / 20);

        if (map[i] == -1) {
            draw.fillStyle = ('Red');
            draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 5, 30, 30);
        }

        if (map[i] > 0) {
            draw.fillStyle = ('Black');

            if (map[i] == worm_length + 1) {
                draw_direction_current(worm_array[map[i] - 3]);
                draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 5, 30, 30);
            }
            

            if (map[i] != worm_length + 1) {
                draw_direction_current(worm_array[map[i] - 3]);
                draw_direction_previous(worm_array[map[i] - 2]);
                draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 5, 30, 30);
                }

            if (map[i] == 2) {
                draw.fillStyle = ('Magenta');
                if (worm_array[map[i] - 2] == east) {
                    draw.fillRect(worm_head_x * 40 + 27, worm_head_y * 40 + 8, 5, 5);
                    draw.fillRect(worm_head_x * 40 + 27, worm_head_y * 40 + 27, 5, 5);
                    draw.fillStyle = ('White');
                    draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40, 30, 5);//north
                    draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 35, 30, 5);//south
                    draw.fillRect(worm_head_x * 40 + 35 , worm_head_y * 40 + 5, 5, 30);//east
                    //draw.fillRect(worm_head_x * 40, worm_head_y * 40 + 5, 5, 30);//west
                }
                if (worm_array[map[i] - 2] == west) {
                    draw.fillRect(worm_head_x * 40 + 8, worm_head_y * 40 + 8, 5, 5);
                    draw.fillRect(worm_head_x * 40 + 8, worm_head_y * 40 + 27, 5, 5);
                    draw.fillStyle = ('White');
                    draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40, 30, 5); //north
                    draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 35, 30, 5);//south
                    //draw.fillRect(worm_head_x * 40 + 35 , worm_head_y * 40 + 5, 5, 30);//east
                    draw.fillRect(worm_head_x * 40, worm_head_y * 40 + 5, 5, 30);//west
                }
                if (worm_array[map[i] - 2] == north) {
                    draw.fillRect(worm_head_x * 40 + 27, worm_head_y * 40 + 8, 5, 5);
                    draw.fillRect(worm_head_x * 40 + 8, worm_head_y * 40 + 8, 5, 5);
                    draw.fillStyle = ('White');
                    draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40, 30, 5); //north
                    //draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 35, 30, 5);//south
                    draw.fillRect(worm_head_x * 40 + 35 , worm_head_y * 40 + 5, 5, 30);//east
                    draw.fillRect(worm_head_x * 40, worm_head_y * 40 + 5, 5, 30);//west
                }
                if (worm_array[map[i] - 2] == south) {
                    draw.fillRect(worm_head_x * 40 + 27, worm_head_y * 40 + 27, 5, 5);
                    draw.fillRect(worm_head_x * 40 + 8, worm_head_y * 40 + 27, 5, 5);
                    draw.fillStyle = ('White');
                    //draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40, 30, 5); //north
                    draw.fillRect(worm_head_x * 40 + 5, worm_head_y * 40 + 35, 30, 5);//south
                    draw.fillRect(worm_head_x * 40 + 35 , worm_head_y * 40 + 5, 5, 30);//east
                    draw.fillRect(worm_head_x * 40, worm_head_y * 40 + 5, 5, 30);//west
                }
            }
        }
        if (map[i] == 0) {
            draw.fillStyle = ('White');
            draw.fillRect(worm_head_x * 40, worm_head_y * 40, 40, 40);
        }
        i = i + 1
    }
}





function gameprogress() {
    direction();
    body_movement();
    travel_distance = travel_distance + 1;
    current_direction = worm_direction;

    worm_array.pop()
    worm_array.unshift(current_direction)
    make_screen();
    if (death == 1) {
        clearInterval(gameplay);
        restart = 1;
    }
    
 
}

count=0

document.getElementById('Made_by').onclick = function() {
    count = count + 1;

    if (count >= 3) {
        alert('Stop Poking');
    }
}



document.addEventListener('keydown', function(event) {
    if (event.keyCode == 38) {
        if (current_direction != south) {
            worm_direction = north;
        }
    }
    if (event.keyCode == 40) {
        if (current_direction != north) {
            worm_direction = south;
        }
    }
    if (event.keyCode == 37) {
        if (current_direction != east) {
            worm_direction = west;
        }
    }
    if (event.keyCode == 39) { 
        if (current_direction != west) {
            worm_direction = east;
        }
    }

    if (event.keyCode == 87) {
        if (current_direction != south) {
            worm_direction = north;
        }
    }
    if (event.keyCode == 83) {
        if (current_direction != north) {
            worm_direction = south;
        }
    }
    if (event.keyCode == 65) {
        if (current_direction != east) {
            worm_direction = west;
        }
    }
    if (event.keyCode == 68) { 
        if (current_direction != west) {
            worm_direction = east;
        }
    }

    if (event.keyCode == 80) {
        if (current_direction != south) {
            worm_direction = north;
        }
    }
    if (event.keyCode == 186) {
        if (current_direction != north) {
            worm_direction = south;
        }
    }
    if (event.keyCode == 76) {
        if (current_direction != east) {
            worm_direction = west;
        }
    }
    if (event.keyCode == 222) { 
        if (current_direction != west) {
            worm_direction = east;
        }
    }

    if (event.keyCode == 27) { 
        alert("Paused")
    }  
    if (restart == 1) {
        reset_count = reset_count + 1
        if (reset_count > 1) {
            draw.fillStyle = "White"
            draw.fillRect(0, 0, 800, 600);
            draw.fillStyle = "Black";
            draw.font = "100px Bold Arial";
            draw.fillText("You ate yourself!", 15, 350);
            draw.font = "40px Bold Arial";
            draw.fillText("Press any key to restart",180, 500)
            if (reset_count > 2){
                location.reload(0);
            }
        }
    }
})


var time_per_block = 50;
var gameplay = setInterval(gameprogress, time_per_block);

var restart = 0;
