
var instr;

$(document).ready(function()
{


});
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audio = new AudioContext();
var buffer_seconds = 0.25;
var playNoise = function() {
var source = audio.createBufferSource();
  for (var channel = 0; channel < b.channels; channel++) {

   var nowBuffering = b.buffer.getChannelData(channel);
   for (var i = 0; i < b.frameCount; i++) {
     // Math.random() is in [0; 1.0]
     // audio needs to be in [-1.0; 1.0]
     nowBuffering[i] = Math.random() * 2 - 1;
   }
  }
  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  // set the buffer in the AudioBufferSourceNode

  // start the source playing

  source.buffer = b.buffer;
  source.connect(audio.destination);
  source.start();

}

  function play_sample(sample)
  {
    if (sample)
    {


     var audioData = sample;
     var source = audio.createBufferSource();
      audio.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          source.connect(audio.destination);
          //b.source.connect(audio.destination);
          source.start();

        },

        function(e){"Error with decoding audio data" + e.err});
    }
  }




function Buffer() {
  self = this;
  this.channels = 2;
  this.frameCount = audio.sampleRate * buffer_seconds;
  this.buffer = audio.createBuffer(2, this.frameCount, audio.sampleRate);
  this.source = audio.createBufferSource();
  this.source.connect(audio.destination);
  this.index = 0;


  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound


}

// Create the data for the drum machine.

function Instruments(instr_array, selection, f_multi)
{
  if (instr_array == undefined)
  {
    instr_array = [null,null,null,null,null,null]
    if (selection == 'drum_kit')
    {
      instr_array = ['percus1_play','hihat1_play','tom1_play','clap1_play','snare1_play','kick1_play'];
      //console.log(selection)
    }
  }
  if (selection == undefined)
  {
    selection = "original"
  }
  this.type = selection;
  this.instr_tags = instr_array;
  this.sine_wave = function(audio, frequency, duration)
  {
    return function()
    {
      var wave = createSineWave(audio, duration);
      wave.frequency.value = frequency;
      chain([wave, createAmplifier(audio, 0.2, duration), audio.destination]);
    };
  };

  this.sawtooth_wave = function(audio, frequency, duration)
  {
    return function()
    {
      var wave = createSawtoothWave(audio, duration);
      wave.frequency.value = frequency;
      chain([wave, createAmplifier(audio, 0.2, duration), audio.destination]);
    };
  };
  this.square_wave = function(audio, frequency, duration)
  {
    return function()
    {
      var wave = createSquareWave(audio, duration);
      wave.frequency.value = frequency;
      chain([wave, createAmplifier(audio, 0.2, duration), audio.destination]);
    };
  };
  this.triangle_Wave = function(audio, frequency, duration)
  {
    return function()
    {

      var wave = createTriangleWave(audio, duration);
      wave.frequency.value = frequency;
      chain([wave, createAmplifier(audio, 0.2, duration), audio.destination]);
    };
  };
  this.fat_wave = function(audio, frequency, duration)
  {
    return function()
    {
      var amplifier = audio.createGain();
          amplifier.gain.value = 0.2;
      var square_wave = createSquareWave(audio, duration);
      var triangle_wave = createTriangleWave(audio, duration);
      triangle_wave.frequency.value = frequency;
      square_wave.frequency.value = frequency/2;
      chain([square_wave, amplifier, audio.destination]);
      chain([triangle_wave, amplifier, audio.destination]);

    };
  };
  this.chill_wave = function(audio, frequency, duration)
  {
    return function()
    {
      var amplifier = audio.createGain();
          amplifier.gain.value = 0.2;

      var sine_wave = createSineWave(audio, duration);
      var triangle_wave = createTriangleWave(audio, duration);
      triangle_wave.frequency.value = frequency/2;
      sine_wave.frequency.value = frequency;
      chain([sine_wave, createAmplifier(audio, 0.2, duration), audio.destination]);
      chain([triangle_wave, createAmplifier(audio, 0.2, duration), audio.destination]);

    };
  };
  this.thick_square = function(audio, frequency, duration)
  {
    return function()
    {
      var amplifier = audio.createGain();
          amplifier.gain.value = 0.2;

      var square_wave = createSineWave(audio, duration);
      var square_wave2 = createSquareWave(audio, duration);
      square_wave.frequency.value = frequency*2;
      square_wave.detune.value = -6;
      square_wave2.frequency.value = frequency/2;
      chain([square_wave, createAmplifier(audio, 0.2, duration), audio.destination]);
      chain([square_wave2, createAmplifier(audio, 0.2, duration), audio.destination]);

    };
  };
  this.c2_minor = [65.41, 73.42, 77.78, 87.31, 98.00, 103.83, 116.54, 130.81]
  this.c3_minor = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 233.08, 261.63]
  this.f_multi = f_multi;
  this.short_duration = 0.5;
  this.med_duration = 1;
  this.long_duration = 2;
  this.original = [createTrack("gold", note(audio, 880)),
               createTrack("gold", note(audio, 659)),
               createTrack("gold", note(audio, 587)),
               createTrack("gold", note(audio, 523)),
               createTrack("gold", note(audio, 440)),
               createTrack("dodgerblue", kick(audio))]
  this.drum_kit = [createTrack("gold", b.percus1_play),
               createTrack("gold", b.hihat1_play),
               createTrack("gold", b.tom1_play),
               createTrack("gold", b.clap1_play),
               createTrack("gold", b.snare1_play),
               createTrack("dodgerblue", b.kick1_play)];
  this.simple_square = [createTrack("gold", this.square_wave(audio, this.c2_minor[7]*this.f_multi, this.short_duration)),
               createTrack("gold", this.square_wave(audio, this.c2_minor[6]*this.f_multi, this.short_duration)),
               createTrack("gold", this.square_wave(audio, this.c2_minor[5]*this.f_multi, this.short_duration)),
               createTrack("gold", this.square_wave(audio, this.c2_minor[4]*this.f_multi, this.short_duration)),
               createTrack("gold", this.square_wave(audio, this.c2_minor[3]*this.f_multi, this.short_duration)),
               createTrack("gold", this.square_wave(audio, this.c2_minor[2]*this.f_multi, this.short_duration)),
               createTrack("gold", this.square_wave(audio, this.c2_minor[1]*this.f_multi, this.short_duration)),
               createTrack("gold", this.square_wave(audio, this.c2_minor[0]*this.f_multi, this.short_duration))]
  this.simple_sawtooth = [createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[7]*this.f_multi, this.short_duration)),
                createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[6]*this.f_multi, this.short_duration)),
              createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[5]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[4]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[3]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[2]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[1]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sawtooth_wave(audio, this.c2_minor[0]*this.f_multi, this.short_duration))]
  this.simple_sine = [createTrack("gold", this.sine_wave(audio, this.c2_minor[7]*this.f_multi, this.short_duration)),
                createTrack("gold", this.sine_wave(audio, this.c2_minor[6]*this.f_multi, this.short_duration)),
              createTrack("gold", this.sine_wave(audio, this.c2_minor[5]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sine_wave(audio, this.c2_minor[4]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sine_wave(audio, this.c2_minor[3]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sine_wave(audio, this.c2_minor[2]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sine_wave(audio, this.c2_minor[1]*this.f_multi, this.short_duration)),
               createTrack("gold", this.sine_wave(audio, this.c2_minor[0]*this.f_multi, this.short_duration))]
  this.simple_triangle = [createTrack("gold", this.triangle_Wave(audio, this.c2_minor[7]*this.f_multi, this.short_duration)),
              createTrack("gold", this.triangle_Wave(audio, this.c2_minor[6]*this.f_multi, this.short_duration)),
              createTrack("gold", this.triangle_Wave(audio, this.c2_minor[5]*this.f_multi, this.short_duration)),
               createTrack("gold", this.triangle_Wave(audio, this.c2_minor[4]*this.f_multi, this.short_duration)),
               createTrack("gold", this.triangle_Wave(audio, this.c2_minor[3]*this.f_multi, this.short_duration)),
               createTrack("gold", this.triangle_Wave(audio, this.c2_minor[2]*this.f_multi, this.short_duration)),
               createTrack("gold", this.triangle_Wave(audio, this.c2_minor[1]*this.f_multi, this.short_duration)),
               createTrack("gold", this.triangle_Wave(audio, this.c2_minor[0]*this.f_multi, this.short_duration))]
  this.fat_wave = [createTrack("gold", this.fat_wave(audio, this.c2_minor[7]*this.f_multi, this.short_duration)),
              createTrack("gold", this.fat_wave(audio, this.c2_minor[6]*this.f_multi, this.short_duration)),
              createTrack("gold", this.fat_wave(audio, this.c2_minor[5]*this.f_multi, this.short_duration)),
               createTrack("gold", this.fat_wave(audio, this.c2_minor[4]*this.f_multi, this.short_duration)),
               createTrack("gold", this.fat_wave(audio, this.c2_minor[3]*this.f_multi, this.short_duration)),
               createTrack("gold", this.fat_wave(audio, this.c2_minor[2]*this.f_multi, this.short_duration)),
               createTrack("gold", this.fat_wave(audio, this.c2_minor[1]*this.f_multi, this.short_duration)),
               createTrack("gold", this.fat_wave(audio, this.c2_minor[0]*this.f_multi, this.short_duration))]
  this.chill_wave = [createTrack("gold", this.chill_wave(audio, this.c2_minor[7]*this.f_multi, this.short_duration)),
              createTrack("gold", this.chill_wave(audio, this.c2_minor[6]*this.f_multi, this.short_duration)),
              createTrack("gold", this.chill_wave(audio, this.c2_minor[5]*this.f_multi, this.short_duration)),
               createTrack("gold", this.chill_wave(audio, this.c2_minor[4]*this.f_multi, this.short_duration)),
               createTrack("gold", this.chill_wave(audio, this.c2_minor[3]*this.f_multi, this.short_duration)),
               createTrack("gold", this.chill_wave(audio, this.c2_minor[2]*this.f_multi, this.short_duration)),
               createTrack("gold", this.chill_wave(audio, this.c2_minor[1]*this.f_multi, this.short_duration)),
               createTrack("gold", this.chill_wave(audio, this.c2_minor[0]*this.f_multi, this.short_duration))]
  this.thick_square = [createTrack("gold", this.thick_square(audio, this.c2_minor[7]*this.f_multi, this.short_duration)),
              createTrack("gold", this.thick_square(audio, this.c2_minor[6]*this.f_multi, this.short_duration)),
              createTrack("gold", this.thick_square(audio, this.c2_minor[5]*this.f_multi, this.short_duration)),
               createTrack("gold", this.thick_square(audio, this.c2_minor[4]*this.f_multi, this.short_duration)),
               createTrack("gold", this.thick_square(audio, this.c2_minor[3]*this.f_multi, this.short_duration)),
               createTrack("gold", this.thick_square(audio, this.c2_minor[2]*this.f_multi, this.short_duration)),
               createTrack("gold", this.thick_square(audio, this.c2_minor[1]*this.f_multi, this.short_duration)),
               createTrack("gold", this.thick_square(audio, this.c2_minor[0]*this.f_multi, this.short_duration))]
  this.custom_kit = [createTrack("gold", b[instr_array[0]]),
               createTrack("gold", b[instr_array[1]]),
               createTrack("gold", b[instr_array[2]]),
               createTrack("gold", b[instr_array[3]]),
               createTrack("gold", b[instr_array[4]]),
               createTrack("gold", b[instr_array[5]])]
  this.current_instrument = this[selection];


}



  // Update
  // ------

  // Runs every hundred milliseconds.


  // Draw
  // ----

  // Get the `screen` object.  This is a bundle of functions that draw
  // in the canvas element.

  // **draw()** draws the drum machine.  Called once at the beginning of
  // the program.  It's then called 60 times a second forever (see the
  // call to `requestAnimationFrame()` below).


  // Handle events
  // -------------

  // **setupButtonClicking()** sets up the event handler that will make
  // mouse clicks turn track buttons on and off.


  // **note()** plays a note with a pitch of `frequency` for `1` second.
  function note(audio, frequency) {
    return function() {
      var duration = 1;

      // Create the basic note as a sine wave.  A sine wave produces a
      // pure tone.  Set it to play for `duration` seconds.
      var sineWave = createSineWave(audio, duration);

      // Set the note's frequency to `frequency`.  A greater frequency
      // produces a higher note.
      sineWave.frequency.value = frequency;

      // Web audio works by connecting nodes together in chains.  The
      // output of one node becomes the input to the next.  In this way,
      // sound is created and modified.
      chain([

        // `sineWave` outputs a pure tone.
        sineWave,

        // An amplifier reduces the volume of the tone from 20% to 0
        // over the duration of the tone.  This produces an echoey
        // effect.
        createAmplifier(audio, 0.2, duration),

        // The amplified output is sent to the browser to be played
        // aloud.
        audio.destination]);
    };
  };

  // **kick()** plays a kick drum sound for `1` second.
  function kick(audio) {
    return function() {
      var duration = 2;
      var dur2 = 0.2;

      // Create the basic note as a sine wave.  A sine wave produces a
      // pure tone.  Set it to play for `duration` seconds.
      var sineWave = createSineWave(audio, duration);
      var squareWave = createSquareWave(audio, dur2);
      // Set the initial frequency of the drum at a low `160`.  Reduce
      // it to 0 over the duration of the sound.  This produces that
      // BBBBBBBoooooo..... drop effect.

      //(audio_context, oscNode, freq, duration)
      rampDown(audio, sineWave.frequency, 200, duration);
      rampDown(audio, squareWave.frequency, 320, dur2);
      // Web audio works by connecting nodes together in chains.  The
      // output of one node becomes the input to the next.  In this way,
      // sound is created and modified.
      chain([

        // `sineWave` outputs a pure tone.
        sineWave,

        // An amplifier reduces the volume of the tone from 40% to 0
        // over the duration of the tone.  This produces an echoey
        // effect.
        createAmplifier(audio, 0.4, duration),

        // The amplified output is sent to the browser to be played
        // aloud.
        audio.destination]);

        chain([squareWave, createAmplifier(audio, 0.05,dur2), audio.destination])
    };
  };

  function snare(audio) {
    return function() {
      var duration = 0.5;
      var dur2 = 0.1;

      // Create the basic note as a sine wave.  A sine wave produces a
      // pure tone.  Set it to play for `duration` seconds.
      var noiseWave = createNoise(audio, duration);


      var timer = 0;
      var send_to_randomizer = function()
      {
        randomize(audio, noiseWave.frequency, 220, 0.001);
        timer++
        if (timer >= 100)
          {
            clearTimeout(noise_randomize);
            console.log('done!')
          }
      }
      var noise_randomize = setInterval(send_to_randomizer, 0.1)



      //(audio_context, oscNode, freq, duration)
      //rampDown(audio, noiseWave.frequency, 200, duration);
      //rampDown(audio, squareWave.frequency, 320, dur2);
      // Web audio works by connecting nodes together in chains.  The
      // output of one node becomes the input to the next.  In this way,
      // sound is created and modified.
      chain([

        // `sineWave` outputs a pure tone.
        noiseWave,

        // An amplifier reduces the volume of the tone from 40% to 0
        // over the duration of the tone.  This produces an echoey
        // effect.
        createAmplifier(audio, 0.8, duration),

        // The amplified output is sent to the browser to be played
        // aloud.
        audio.destination]);

        //chain([squareWave, createAmplifier(audio, 0.05,dur2), audio.destination])
    };
  };

  // **createSineWave()** returns a sound node that plays a sine wave
  // for `duration` seconds.
  function createSineWave(audio, duration) {

    // Create an oscillating sound wave.
    var oscillator = audio.createOscillator();

    // Make the oscillator a sine wave.  Different types of wave produce
    // different characters of sound.  A sine wave produces a pure tone.
    oscillator.type = "sine";

    // Start the sine wave playing right now.
    oscillator.start(audio.currentTime);

    // Tell the sine wave to stop playing after `duration` seconds have
    // passed.
    oscillator.stop(audio.currentTime + duration);

    // Return the sine wave.
    return oscillator;
  };

  function createSawtoothWave(audio, duration) {

    // Create an oscillating sound wave.
    var oscillator = audio.createOscillator();

    // Make the oscillator a sine wave.  Different types of wave produce
    // different characters of sound.  A sine wave produces a pure tone.
    oscillator.type = "sawtooth";

    // Start the sine wave playing right now.
    oscillator.start(audio.currentTime);

    // Tell the sine wave to stop playing after `duration` seconds have
    // passed.
    oscillator.stop(audio.currentTime + duration);

    // Return the sine wave.
    return oscillator;
  };

  function createSquareWave(audio, duration) {

    // Create an oscillating sound wave.
    var oscillator = audio.createOscillator();

    // Make the oscillator a sine wave.  Different types of wave produce
    // different characters of sound.  A sine wave produces a pure tone.
    oscillator.type = "square";

    // Start the sine wave playing right now.
    oscillator.start(audio.currentTime);

    // Tell the sine wave to stop playing after `duration` seconds have
    // passed.
    oscillator.stop(audio.currentTime + duration);

    // Return the sine wave.
    return oscillator;
  };

  function createTriangleWave(audio, duration) {

    // Create an oscillating sound wave.
    var oscillator = audio.createOscillator();

    // Make the oscillator a sine wave.  Different types of wave produce
    // different characters of sound.  A sine wave produces a pure tone.
    oscillator.type = "triangle";

    // Start the sine wave playing right now.
    oscillator.start(audio.currentTime);

    // Tell the sine wave to stop playing after `duration` seconds have
    // passed.
    oscillator.stop(audio.currentTime + duration);

    // Return the sine wave.
    return oscillator;
  };



  // **rampDown()** takes `value`, sets it to `startValue` and reduces
  // it to almost `0` in `duration` seconds.  `value` might be the
  // volume or frequency of a sound.
  function rampDown(audio, value, startValue, duration) {
    value.setValueAtTime(startValue, audio.currentTime);
    value.exponentialRampToValueAtTime(0.01, audio.currentTime + duration);
  };




  // **createAmplifier()** returns a sound node that controls the volume
  // of the sound entering it.  The volume is started at `startValue`
  // and ramped down in `duration` seconds to almost `0`.
  function createAmplifier(audio, startValue, duration) {
    var amplifier = audio.createGain();
    rampDown(audio, amplifier.gain, startValue, duration);
    return amplifier;
  };





  // **chain()** connects an array of `soundNodes` into a chain.  If
  // there are three nodes in `soundNodes`, the output of the first will
  // be the input to the second, and the output of the second will be
  // the input to the third.
  function chain(soundNodes) {
    for (var i = 0; i < soundNodes.length - 1; i++) {
      soundNodes[i].connect(soundNodes[i + 1]);
    }
  };

  // **createTrack()** returns an object that represents a track.  This
  // track contains an array of 16 steps.  Each of these are either on
  // (`true`) or off (`false`).  It contains `color`, the color to draw
  // buttons when they are on.  It contains `playSound`, the function
  // that plays the sound of the track.

