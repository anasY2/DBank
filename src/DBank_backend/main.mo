import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";
actor DBank{
stable var currentValue:Float=300; //when update the state value is stored and persisted

stable var startTime=Time.now(); //the time when we start

//for updating the money
public func topUp(amount:Float){
currentValue+=amount;
  
 };

//for withdrawing
public func withDraw(amount:Float):async Float{
  let tempValue: Float =currentValue-amount;
  if(tempValue>=0){
  currentValue-=amount;
  return currentValue;
  }else{
    return (currentValue-amount);
   }
};

//for checking balance
public query func checkBalance():async Float{
       return currentValue;

};

//calculation compound interest
public func compound(){

  let currentTime=Time.now();      //time when a user want to know compound interest
  let timeElapsed=currentTime-startTime; //time elapsed since this system was made
  let timeElapsedInSec=(timeElapsed/1000000000)/3600;
  currentValue:= currentValue*(1.01**Float.fromInt(timeElapsedInSec));
  startTime:=currentTime;
 

};

}