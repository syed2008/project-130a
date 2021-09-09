song = "";
song1 = "";
scoreleftWrist = 0;
scorerightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
songstatus = 0;
song1status = 0;
function preload(){
    song = loadSound("music2.mp3");
    song1 = loadSound("music1.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(450,250);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    songstatus = song.isPlaying();
    songstatus = song1.isPlaying();
    if(scoreleftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    song.stop();
    if(song1status == false){
    song1.play();
    document.getElementById("song").innerHTML = "playing-music1.mp3" ;
    }
}
if(scorerightWrist > 0.2){
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    if(songstatus == false){
    song.play();
    document.getElementById("song").innerHTML = "playing-music2.mp3" ;
    }
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('PoseNet is initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist  = " + scoreleftWrist + "scorerightWrist = " + scorerightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
    }
