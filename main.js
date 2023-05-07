object = []
status1 = ""
function preload(){
   alarm = loadSound("fire_alarm.mp3")
}
function setup(){
    Canvas = createCanvas(400,400)
    Canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(400,400)
    ObjectDector = ml5.objectDetector("cocossd",modelloaded)
    
    document.getElementById("Status").innerHTML = "Status:Started decating...."
    alarm.play()
}
function modelloaded(){
    console.log("model loaded")
    status1 = true
}
function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        object = result
    }
}
function draw(){
    image(video,0,0,400,400)
    if(status1 != ""){
        alarm.pause()
        ObjectDector.dectect(video,gotResult)
        for(i=0;i<object.length;i++){
            fill()
            percent = floor((object[i].confidence)*100)
            text(object[i].label+""+percent+"%"+object[i].x+15,object[i].y+15)
            noFill();
            if(object[i].label == "person" || "Person"){
                document.getElementById("Fund").innerHTML = "Baby Found"
            }
            else{
                alarm.play()
            }
        }
    }
}