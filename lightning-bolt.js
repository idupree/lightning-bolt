$(function() {
  "use strict";
  var lightningsCurrentlyFlashing = 0;
  var flicker = function(on) {
    $('html').toggleClass('lightningstriking', on);
  };
  // flipped-argument setTimeout makes the delay chains more readable
  var timeout = function(delay, func) {
    return setTimeout(func, delay);
  };
  $('a.lightningbolt').click(function(e) {
    e.preventDefault();
    e.stopPropagation();

    // If the user decides to click many times fast,
    // it gets even more awesome!
    lightningsCurrentlyFlashing++;

    // Start over the thunder sound on every click.
    // See below for additional crackles that happen sometimes
    // during repeated-clicking lightning.
    // The sound file is public-domain.
    $('#lightningcrackle').jPlayer("play", 0);

    // Clicking during lightning extends the remaining lightning-duration
    // somewhat, up to a point.  I chose this schedule by tweaking it
    // until I liked the aesthetic.  I didn't like the simpler
    // "500 * lightningsCurrentlyFlashing" aesthetic as much.
    var firstDelay = [500, 800, 1350, 1900, 2200][Math.min(4, lightningsCurrentlyFlashing - 1)];
    var secondDelay = 300;
    var laterDelays = (lightningsCurrentlyFlashing >= 3) ? 450 : 130;

    // For repeated clicking: moving the bolt, rather than keeping it
    // in the same place or creating duplicates, felt most aesthetic.
    // 'left: 40%' is centered; then add/subtract a random number of
    // percentage points.
    var bolt_position = Math.round(40 + (Math.random()-0.5)*60) + '%';
    $('.bolt').css('left', bolt_position);

    // Each new lightning strike (click) adds more flickering on and off.
    flicker(true);
    timeout(firstDelay, function() {
      flicker(false);
      timeout(secondDelay, function() {
        flicker(true);
        timeout(laterDelays, function() {
          flicker(false);
          timeout(laterDelays, function() {
            flicker(true);
            timeout(laterDelays, function() {
              flicker(false);
              lightningsCurrentlyFlashing--;
              // Some additional crackles during multiple lightning-bolts.
              // Randomness here helps the thundery aesthetic.
              // These additional crackles restart the audio at a random
              // point within the first second of the track.
              if(lightningsCurrentlyFlashing >= 2 && Math.random() < 0.4) {
                $('#lightningcrackle').jPlayer("play", Math.random()*1.0);
              }
              });});});});});
  });
  // For audio, use jPlayer and several audio-codec options
  // for portability of this audio to the most browsers:
  $('body').append('<div id="lightningcrackle" class="invisibleMedia"></div>');
  $('#lightningcrackle').jPlayer({
    swfPath: "lightning-bolt/Jplayer.swf?rr",
    wmode: "window",
    ready: function(event) {
      $(this).jPlayer("setMedia", {
        mp3: "lightning-bolt/thunder.mp3?rr",
        oga: "lightning-bolt/thunder.ogg?rr",
        wav: "lightning-bolt/thunder.wav?rr"
      });
    },
    supplied: "oga,mp3,wav"
  });
});
