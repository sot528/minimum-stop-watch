var titleIncrementer = 0;

var Main = new (function() {
    var $stopwatch,
        incrementTime = 70,
        currentTime = 0,
        updateTimer = function() {
            var currentFormatTime = formatTime(currentTime);
            $stopwatch.html(currentFormatTime);

            ++titleIncrementer;

            if (titleIncrementer >= 30) {
                // title
                $('title').html(currentFormatTime);
                titleIncrementer = 0;
            }

            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatch = $('#stopwatch');
            Main.Timer = $.timer(updateTimer, incrementTime, true);
        };
    this.resetStopwatch = function() {
        currentTime = 0;
        this.Timer.stop().once();
    };
    $(init);
});

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

// Keyboard Shortcuts
$(document).keypress(function(event){
  switch (event.which) {
    case 112: // P
    case 32: // Space
    case 13: // Enter
      // Play
      Main.Timer.toggle();
      break;
    case 114: // R
    case 27: // Esc
      // Reset
      Main.resetStopwatch();
      break;
    default:
      console.log(event.keyCode);
      break;
  }
});
