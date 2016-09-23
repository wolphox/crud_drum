var song;
$(document).ready(function(){
  song = new Song();
  addClip();
  addClip();
  addClip();
  addClip();
  addClip();
})

function Song()
{
  self = this;
  this.clips = [];
  this.current_clip = 0;
  console.log(this.clips.length)
  this.track_length = 0;
  this.pattern_tracker = setInterval(function() {


  if (self.clips.length > 0 )
  {
    // Increase `data.step` by one for current clip.  If `data.step` is `15` (the last
    // step), move to next clip reset step value to 0
    self.clips[self.current_clip].data.step = (self.clips[self.current_clip].data.step + 1)
    if (self.clips[self.current_clip].data.step == self.clips[self.current_clip].data.tracks[0].steps.length)
    {
      self.clips[self.current_clip].data.step = 0;
      self.current_clip = (self.current_clip + 1) % self.clips.length;
    }
  }
    // Find all the tracks where the current step is on.  Play the
    // sounds for those tracks.
    self.clips[self.current_clip].data.tracks
      .filter(function(track) {  return track.steps[self.clips[self.current_clip].data.step]; })
      .forEach(function(track)
        {
          track.playSound();
        });
  }, 100);
};

function addClip(clip_number)
{
  var new_clip = new Pattern(clip_number)
  song.clips.push(new_clip)
  song.track_length+=16;
}





