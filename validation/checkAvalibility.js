function overlap(dateRanges){
    var sortedRanges = dateRanges.sort((previous, current) => {
    
      // get the start date from previous and current
      var previousTime = previous.start.getTime();
      var currentTime = current.start.getTime();
  
      // if the previous is earlier than the current
      if (previousTime < currentTime) {
        return -1;
      }
  
      // if the previous time is the same as the current time
      if (previousTime === currentTime) {
        return 0;
      }
  
      // if the previous time is later than the current time
      return 1;
    });
    
    var result = sortedRanges.reduce((result, current, idx, arr) => {
      // get the previous range
      if (idx === 0) { return result; }
      var previous = arr[idx-1];
    
      // check for any overlap
      var previousEnd = previous.end.getTime();
      var currentStart = current.start.getTime();
      var overlap = (previousEnd > currentStart);
    
      // store the result
      if (overlap) {
        // yes, there is overlap
        result.overlap = true;
        // store the specific ranges that overlap
        result.ranges.push({
          previous: previous,
          current: current
        })
      }
     
      return result;
     
       // seed the reduce  
    }, {overlap: false, ranges: []});
  
  
    // return the final results  
    return result.overlap;
  }

const NUMBER_OF_ROOM = 8
module.exports = function(type, datess,numReq)  {
  result = [];
  date1 = { checkin: datess.checkin, checkout: datess.checkout }
  while(result.length < numReq){
    var roomavaliable = false
  if(type.length < NUMBER_OF_ROOM){
    result.push(type.length)
    type.push({dates:date1})
    roomavaliable = true;
  }else if(type.length === NUMBER_OF_ROOM || result.length < numReq){         ///Check overlap
    for(var i = 0; i < type.length; i++){
        var r1 = {
            start:datess.checkin,
            end:datess.checkout
        }
        r3 = []
        if(type[i].dates.length === 0){
            type[i].dates.push(date1)
            result.push(i)
            roomavaliable = true;
            break
          }else{
       for(var j = 0; j < type[i].dates.length;j++){ 
        var r2 = {
            start: new Date(type[i].dates[j].checkin),
            end: new Date(type[i].dates[j].checkout)
        }
        r3.push(r2)
    }
        var ranges = [r1].concat(r3);
       if(!overlap(ranges)){
          type[i].dates.push(date1)
          result.push(i)
          console.log(result.length + "c")
          roomavaliable = true;
          break
        }}
        if(result.length === numReq){
          break;
        }
        if(!roomavaliable && i === NUMBER_OF_ROOM - 1 ){
            return result = [];
        }
    }
  }}
  return result;
}
