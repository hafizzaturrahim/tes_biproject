var oDataReferensi
var tipePenenalan
var uriDataReferensi

const grafnya=[[0,1],[0,5],[0,17],[1,2],[2,3],[3,4],[5,6],[5,9],[6,7],[7,8],[9,10],[9,13],[10,11],[11,12],[13,14],[13,17],[14,15],[15,16],[17,18],[18,19],[19,20]]
const grafkoneksi=[[4,4],[8,8],[5,8],[6,6],[4,5]]

function setTipePengenal(pPengenal)
{
    tipePenenalan=pPengenal
}

function setUriDataReferensi(pDataReferensi)
{
    uriDataReferensi=pDataReferensi
}

function calcluateK(phuruf,phurufnya)
{
    if (phuruf in phurufnya)
    {
        phurufnya[phuruf]=phurufnya[phuruf]+1
    }
    else
    {
        phurufnya[phuruf]=1
    }
    return phurufnya
}

function findHurufFrekuensiTerbanyak()
{
    var keysnya=Object.keys(hurufnya)
    var maxnya=hurufnya[keysnya[0]]
    var hnya=keysnya[0]
    for (let key of keysnya)
    {
        if(maxnya<hurufnya[key])
        {
            maxnya=hurufnya[key]
            hnya=key
        }
    }
    return hnya
}

function hitungJarak(x1,y1,z1,y2,z2)
{
    dx=x1-x2
    dy=y1-y2
    dz=z2-z1
    jarak=Math.sqrt(Math.pow(dx,2))
    return jarak
}

function hitungSudut(x1,y1,z1,x2,y2,z2)
{
    var dx=x2-x1
    var dy=y2-y1
    var dz=z2-z1
    var rxy=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))
    //var arah1=Math.atan2(dz,rxy)
    var arah1=Math.atan2(dy,dx)
   
    //arah1=dy/dx
    //arah1[arah1>=0]=arah1[arah1>=0]*180/np.pi
    //arah1[arah1<0]=(arah1[arah1<0]+2*np.pi)*180/np.pi
    arah1=(arah1*180/Math.PI+360)%360
    return arah1
}

function ekstrakFiturSudut(aOskeletonKanan, aOskeletonKiri,pgrafnya,pgrafkoneksi,pSumKanan,pSumKiri)
{
    
    var fiturkanan=[]
    var fiturkiri=[]
    var fiturkanankiri=[]
    //fiturAll=new Array()
    var indx=0
    //for (const datanodekanannya of aOskeletonKanan)
    //{
//alert(JSON.stringify(datanodekanannya))
    for (let grap of pgrafnya)
    {
        let node1=aOskeletonKanan[grap[0]];
        let node2=aOskeletonKanan[grap[1]];
    

        let x1=node1.x;
        let y1=node1.y;
        let z1=node1.z;

        let x2=node2.x;
        let y2=node2.y;
        let z2=node2.z;

        let sudut_x_y=hitungSudut(x1,y1,z1,x2,y2,z2)
    
        fiturkanan.push(sudut_x_y)

        node1=aOskeletonKiri[grap[0]];
        node2=aOskeletonKiri[grap[1]];;

        x1=node1.x;
        y1=node1.y;
        z1=node1.z;

        x2=node2.x;
        y2=node2.y;
        z2=node2.z;

        sudut_x_y=hitungSudut(x1,y1,z1,x2,y2,z2)
        fiturkiri.push(sudut_x_y)
    

    }

    for (let grap of pgrafkoneksi)
    {

        let node1=aOskeletonKanan[grap[0]];
        let node2=aOskeletonKiri[grap[1]];
    
        
        let x1=node1.x;
        let y1=node1.y;
        let z1=node1.z;

        let x2=node2.x;
        let y2=node2.y;
        let z2=node2.z;
        if (pSumKanan==0 || pSumKiri==0)
        {
            x1=0
            y1=0
            z1=0
            x2=0
            y2=0
            z2=0
        }
        
        let sudut_x_y=hitungSudut(x1,y1,z1,x2,y2,z2)
        fiturkanankiri.push(sudut_x_y)
    }
    
    return fiturkanan.concat(fiturkiri,fiturkanankiri)
}

function bedaSudut(sudut1,sudut2)
{
   
   
    return Math.min(Math.abs(sudut1-sudut2),Math.abs(360-Math.abs(sudut1-sudut2)))
}

       
function knnBisindo1(pDataLabel,pDataUji)
{
    bedanya=Math.abs(oDataReferensi-pDataUji)
    bedanya360=360-bedanya
    bedanyakhir=Math.min(bedanya,bedanya360)
    bedasum=bedanyakhir.sum(axis=1)
    indxmin=Math.argmin(bedasum)
    return (pDataLabel[indxmin],indxmin)
}

function knnBisindo(pDataUji){
    //let bedas=new Array()
    let indxMin=0
    let jmlSudutMin=99999
    let indx=0
    let ajlmSudut=[]
    for (let pdrf of oDataReferensi){

        let jmlSudut=0
        let inxlokal=0

    for (let [key, value] of Object.entries(pdrf)) {
    
        if (key!="abjad" && key!="namafile")
        {
            jmlSudut=jmlSudut+bedaSudut(value,pDataUji[inxlokal])
//oIsinya.innerHTML= oIsinya.innerHTML+" "+value+" "+pDataUji[inxlokal]
//console.log(value,pDataUji[inxlokal])

//oIsinya.innerHTML= oIsinya.innerHTML+bedaSudut(value,pDataUji[inxlokal])
inxlokal=inxlokal+1
    }
}
ajlmSudut.push(jmlSudut)
       // alert(inxlokal)
    // console.log(indx,jmlSudut,pdrf.abjad)
if (jmlSudutMin>jmlSudut)
{
    jmlSudutMin=jmlSudut
    indxMin=indx
   
}
indx=indx+1
     
    }
    //oIsinya.innerHTML=oIsinya.innerHTML+JSON.stringify(ajlmSudut)
    
    //alert(indx)
    //console.log("sudut minimum",jmlSudutMin)
   // console.log("index ",indxMin)
    //console.log(JSON.stringify(ajlmSudut))
   
    return oDataReferensi[indxMin].abjad;
    //return pDataLabel[np.argmin(np.array(bedas))]

}

function findIndexOfMinimumValues(pArray)
{
    let indxMin=0
    const npArray=pArray.length
    for (let i=1;i<npArray;i++)
    {
if (pArray[indxMin]>pArray[i])
{
    indxMin=i
}
    }
}

function loadDataReferensi(pFunctionName)
{
    if(tipePenenalan=="huruf")
    {
        setUriDataReferensi("https://biprojectapi.brin.go.id/referensihuruf")
    }
    else if(tipePenenalan=="angka")
    {
        setUriDataReferensi("https://biprojectapi.brin.go.id/referensiangka")
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) 
        { 
            if (xmlhttp.status == 200) {
            let txtResponse=xmlhttp.responseText
            if (txtResponse!="")
            {
                let oDataResponse=JSON.parse(txtResponse)
                oDataReferensi=JSON.parse(oDataResponse.datar)
                pFunctionName;
                
                
            }
            else
            {
                alert("Gagal unduh data referensi!!, error data kosong")
                
            }
            }
            else if (xmlhttp.status == 400) {
                 alert("Gagal unduh data referensi!!, error 400")
                 
            }
            else {
                alert("Gagal unduh data referensi!!, error "+xmlhttp.status.toString());
                
            }
            
        }
        
    };
    xmlhttp.open("GET", uriDataReferensi, true);
    xmlhttp.send();
}

function arrangeTangan(results)
{
    var tanganKiri=[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0}];
    var tanganKanan=[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":0}];
    var sumnyakiri=0
    var sumnyakanan=0
    if (results.multiHandLandmarks.length>0)
    {
        tanganKanan=results.multiHandLandmarks[0]
        sumnyakanan=1
    }
    if (results.multiHandLandmarks.length>1)
    {
        tanganKanan=results.multiHandLandmarks[0]
        tanganKiri=results.multiHandLandmarks[1]
        sumnyakanan=1
        sumnyakiri=1
    }
    let beda=0
    let atribut=tanganKanan.length
    for (let i=0;i<atribut;i++)
    {

        beda=beda+tanganKanan[i].x-tanganKiri[i].x
    }
    
    
    
    if (beda>0 & sumnyakiri>0)
    {
       let tk=tanganKiri
       tanganKiri=tanganKanan
       tanganKanan=tk     
    }

    return {"tanganKiri":tanganKiri,"tanganKanan":tanganKanan,"sumKiri":sumnyakiri,"sumKanan":sumnyakanan}
}