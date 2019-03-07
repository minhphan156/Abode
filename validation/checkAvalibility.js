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

// NUMBER_OF_ROOM can be modify by different type of room(later), 
// maximun number of the room
const NUMBER_OF_ROOM = 8
// @param type array of room of one type (single or double or king or studio) (formate:doc[startIndex].roomTypeAndNumber.single)
// @param datess the request time span (in formate of date:{ checkin: req.body.checkin, checkout: req.body.checkout })
// @param numReq number of room client request
// @param bookID the bookingID needs to be store (for search just pass random string)
// @return return the array of avaliable room(room number), if no room avaliable, return empty array.
module.exports = function(type, datess,numReq,bookID)  {
  // result will contain the room number
  result = [];
  date1 = { checkin: new Date(datess.checkin), checkout: new Date(datess.checkout) }

  // check the result length(# of room avaliable) match the number client request or not, if it match, 
  // stop the loop return the result. 
  while(result.length < numReq){
    var roomavaliable = false

  // if the array of room less than maximun number,
  // means there is unuse room avaliable.
  // put the time span into the avaliable room
  // put the ROOM NUMBER in to result telling others this room is avaliable.
  if(type.length < NUMBER_OF_ROOM){
    result.push(type.length)
    dates = [{ checkin: date1.checkin, checkout: date1.checkout,bookingID:bookID }]
    type.push({dates})
    roomavaliable = true;
  }
  /// if array length equal to maximun number of room, means everyone is used
  //  check the time span inside every room overlap or not
  else if(type.length === NUMBER_OF_ROOM && result.length < numReq) 
  {  
  // loop through each room      
    for(var i = 0; i < type.length; i++){
        var r1 = {
            start:date1.checkin,
            end:date1.checkout
        }
        r3 = []
  // check if this room have no time span in there (used room will have empty object in db)
  // then is avaliable, push the time span into it and push room number into result
        if(type[i].dates.length === 0){
          type[i].dates.push({checkin:date1.checkin, checkout:date1.checkout,bookingID:bookID})
            result.push(i)
            roomavaliable = true;
            break
          }else{
      // if room have time span in there, push all time span into one array to check overlap
       for(var j = 0; j < type[i].dates.length;j++){ 
        var r2 = {
            start: new Date(type[i].dates[j].checkin),
            end: new Date(type[i].dates[j].checkout)
        }
        r3.push(r2)
        }
    // combine the required time span and the room time span
       var ranges = [r1].concat(r3);
    // if no overlap, this room is avaliable, push the index of the room(room number) into result
    // and put the time span into this room. break the for loop to check for next avaliable room 
       if(!overlap(ranges)){
          type[i].dates.push({checkin:date1.checkin, checkout:date1.checkout,bookingID:bookID})
          result.push(i)
          console.log(result.length + "c")
          roomavaliable = true;
          //break
        }}
    // break the for loop once we get enough room for the result.
        if(result.length === numReq){
          break;
        }
    // loop though all the rooms in the array, none of it avaliable,
    // return empty array
        if(!roomavaliable && i === NUMBER_OF_ROOM - 1 ){
            return result = [];
        }
    }
  }}
  return result;
}
