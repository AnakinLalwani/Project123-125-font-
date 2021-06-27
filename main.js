noseX = 0;
noseY = 0;
difference = 0;
rightX = 0;
leftX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    canvas = createCanvas(450, 450);
    canvas.position(560, 150);
    pose_net = ml5.poseNet(video, modelLoaded);
    pose_net.on("pose", gotPoses);
}
function modelLoaded() {
    
    console.log("Pose-net has loaded!");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose" + noseX + " " + noseY);

        rightX = results[0].pose.rightWrist.x;
        leftX = results[0].pose.leftWrist.x;
        console.log("Arms: Right - " + rightX + " Left - " + leftX);

        difference = floor(leftX - rightX);
        console.log("Difference " + difference);
    }
}
function draw() {
    document.getElementById("square-side").innerHTML = "Size of the font will be : " + difference + " px"
    background(255, 255, 255);
    fill('#4b4a52');
    stroke('#4b4a52');
    textSize(difference);
    text("This is Text", noseX, noseY);
}