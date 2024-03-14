const videoElement = document.getElementsByClassName('input_video')[0];
const oIsinya = document.getElementById("isinya")
const oSelectResposibilitas = document.getElementById("selectResponsibilitas")
let responseTime=oSelectResposibilitas.value
let k=0
let jmlnya=0;
let hurufnya=new Object()
let lognya=new Array()
oSelectResposibilitas.onchange=function(){responseTime=this.value}
setTipePengenal(pengenal)
const hands = new Hands({
locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
    });
        
hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
    await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});

function cameraStart(pcamera)
{
    pcamera.start()
}

function cameraStop(pcamera)
{
    pcamera.stop()
}

loadDataReferensi(cameraStart(camera))
let hurufSekarang=""
let hasilTerjemah=""
function onResults(results) {
    /*canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);*/
    if (results.multiHandLandmarks.length>0) {
        
        let tangan=arrangeTangan(results)
        let fitur=ekstrakFiturSudut(tangan.tanganKanan,tangan.tanganKiri,grafnya,grafkoneksi,tangan.sumKanan,tangan.sumKiri)
        
        
        calcluateK(knnBisindo(fitur).toString().toUpperCase(),hurufnya)
        
        if (jmlnya>=responseTime)
        {
            hasilTerjemah=findHurufFrekuensiTerbanyak()
            oIsinya.innerHTML="\""+hasilTerjemah+"\""
            const jamDetik=new Date()
            let jamnya=jamDetik.getHours()
            let menitnya=jamDetik.getMinutes()
            if(jamnya<10)
            {
                jamnya="0"+jamnya.toString()
            }
            if(menitnya<10)
            {
                menitnya="0"+menitnya.toString()
            }
            if (hurufSekarang!=hasilTerjemah){
            const logi={"waktu":jamnya+":"+menitnya,"hasilTerjemah":hasilTerjemah}
            addLog(logi)
            lognya.push(logi)
            hurufSekarang=hasilTerjemah
        }
            hurufnya=new Object()
            jmlnya=0
        }
        jmlnya++

        

        //oIsinya.innerHTML=oIsinya.innerHTML+JSON.stringify(fitur)
        /*for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        
       // console.log(results.multiHandLandmarks);
        } 
        */
    }
    else
    {
        oIsinya.innerHTML="\""+"\""
        hurufnya=new Object()
        hurufSekarang=""
	jmlnya=0
    }
//canvasCtx.restore();
} 
