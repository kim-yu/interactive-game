const deadline = Date.now() + 60000;
const prompts = ['success', 'happiness', 'friendship', 'love', 'satisfaction', 'adventure', 'artistry', 'dreams', 'goals', 'freedom', 'improvement', 'justice', 'life', 'motivation'];
const colors = ['firebrick', 'pink', 'orange', 'gold', 'mediumpurple', 'indigo', 'yellowgreen', 'olive', 'teal', 'turquoise', 'royalblue', 'saddlebrown', 'darkgray', 'black'];
const num_levels = 10;
const input_element = document.getElementById('input');
const max_width = 70;

var prompt_element;
var level = 10;
var level_element;
// var positions = [];
// for (var i=20; i<document.documentElement.clientWidth-25; i++) {
//     positions.push(i);
// };
var text_input_element;
var curr_width = 0;
var previous_color;
var color;

function get_prompt() {
    prompt_element = document.getElementById('prompt');
    prompt_element.innerHTML = prompts[Math.floor(Math.random()*prompts.length)];
};

// function get_position() {
//     if (level_element == undefined) {
//         level_element = document.getElementById('level_10');
//     }

//     var taken = [];
//     if (level_element.childNodes.length > 0) {
//         var phrases = Array.from(level_element.children);
//         phrases.forEach(function(phrase) {
//             var rect_collection = phrase.getClientRects();
//             var left = rect_collection.left;
//             var right = rect_collection.right;
//             for (var n=left; n<right; n++) {
//                 taken.push(n);
//             };
//         });
//     };

//     taken = taken.sort();
//     if (taken.length > 0) {
//         for (var i=1; i<taken.length; i++) {
//             if (taken[i] - taken[i-1] > 3) {
//                 for (var n=taken[i-1]; n<taken[i]; n++) {
//                     positions.push(n);
//                 };
//             };
//         };
//     };
// };

function get_phrase() {
    const input_element = document.getElementById('input');
    text_input_element = document.createElement('input');
    text_input_element.setAttribute('type', 'text');
    text_input_element.setAttribute('autofocus', true);
    text_input_element.setAttribute('id', 'text_input');
    text_input_element.setAttribute('onkeydown', 'search(this)');
    color = colors[Math.floor(Math.random()*colors.length)];
    if (previous_color != undefined) {
        while (color == previous_color) {
            color = colors[Math.floor(Math.random()*colors.length)];
        };
    };
    previous_color = color;
    text_input_element.style.color = color;
    // text_input_element.style.left = positions[Math.floor(Math.random()*positions.length)] + 'px';
    input_element.appendChild(text_input_element);
};

function search() {
    if (event.key === 'Enter') {
        move_phrase();
        // get_position();
        get_phrase();
        $('#text_input').focus();
    };
};

function move_phrase() {
    var phrase = text_input_element.value + ' ';
    if (curr_width + phrase.length > max_width) {
        level -= 1;
        curr_width = phrase.length;
        if (level < 1) {
            end();
        };
    } else {
        curr_width += phrase.length;
    };
    level_element = document.getElementById('level_' + level);
    var input_element = document.getElementById('input');
    input_element.removeChild(text_input_element);
    // var left = text_input_element.style.left;
    var phrase_div = document.createElement('span');
    phrase_div.innerHTML = text_input_element.value + ' ';
    phrase_div.setAttribute('id', phrase.replace(' ', '_'));
    phrase_div.setAttribute('class', 'phrase');
    // phrase_div.style.left = left;
    phrase_div.style.color = color;
    level_element.appendChild(phrase_div);
};

function end() {
    alert('Thank you for sharing what ' + prompt_element.innerHTML + ' means to you.');
};

function start() {
    "use strict";
    get_prompt();
    // get_position();
    get_phrase();
};

var timeleft = 60;
var downloadTimer = setInterval(function() {
    timeleft--;
    document.getElementById('countdown_timer').textContent = timeleft;
    if (timeleft <= 0) {
        end();
        clearInterval(downloadTimer);
    }
}, 1000);
