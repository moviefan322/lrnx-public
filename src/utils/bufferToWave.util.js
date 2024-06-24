export const  bufferToWave = (buffer, len) => {
    let numOfChan = buffer.numberOfChannels,
      length = len * numOfChan * 2 + 44,
      view = new DataView(new ArrayBuffer(length)),
      channels = [],
      i, j, sample,
      offset = 0,
      pos = 0;
  
    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"
  
    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan);  // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)
  
    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 8);                   // chunk length
    
    // write interleaved data
    for(i = 0; i < buffer.getChannelData(0).length; i++) {
      for(j = 0; j < numOfChan; j++) {
        sample = Math.max(-1, Math.min(1, buffer.getChannelData(j)[i]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
    }
  
    // create Blob
    return new Blob([view], { type: 'audio/wav' });
  
    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
  
    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }
  

  