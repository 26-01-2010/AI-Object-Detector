status = "";
video = "";
object = [];
label = "";
object_to_be_detected = "";
function preload()
{
    video = createCapture(VIDEO);
    video.hide();
}
function setup()
{
    canvas = createCanvas(380,380);
    canvas.position(480,59);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}
function draw()
{
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object; i++)
        {
            fill("#00ff00");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            label = objects[i].label;
            noFill();
            stroke("#00ff00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].hieght);
        }
            if(label == object_to_be_detected)
            {
                video.stop()
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = label + " is found"
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(label + " is found");
                synth.speak(utterThis);
            }
    }
    else
    {
        document.getElementById("status").innerHTML = label + " not found";
    }
    

}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detection Objects";
    object_to_be_detected = document.getElementById("object_to_be_detected").value; 
}
function modelLoaded()
{
    console.log("Model Loaded!!");
    status = true;
}