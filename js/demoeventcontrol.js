let pengenal="huruf"
function sembunyikanKonfigurasi()
    {
        let oKonfigurasiContainer=document.getElementById("konfigurasiContainer")
        oKonfigurasiContainer.style.display="none"
        let oLayarUtama = oKonfigurasiContainer.previousElementSibling
        oLayarUtama.className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
        let tombolKonfigurasi=oLayarUtama.getElementsByTagName("button")[0]
        tombolKonfigurasi.style.display="inline"
    }

    function tampilkankanKonfigurasi()
    {
        let oKonfigurasiContainer=document.getElementById("konfigurasiContainer")
        oKonfigurasiContainer.style.display="block"
        let oLayarUtama = oKonfigurasiContainer.previousElementSibling
        oLayarUtama.className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8"
        let tombolKonfigurasi=oLayarUtama.getElementsByTagName("button")[0]
        tombolKonfigurasi.style.display="none"
    }
    function ubahPosisiTeks(oSelect)
    {
        let oDivKontainerVideo=document.getElementById("container-video")
        let oTd = oDivKontainerVideo.getElementsByTagName("td")[0]
        
        let posisi={"atas":"top","tengah":"middle","bawah":"bottom"}
        oTd.style.verticalAlign=posisi[oSelect.value]
        
    }

    var aAbjad=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    var aAngka=["0","1","2","3","4","5","6","7","8","9","10"]
    var aAbjadAngka=aAbjad.concat(aAngka)
    const oSelectPilihHuruf=document.getElementById("02SelectPilihHuruf")
    const oH1AngkaContoh=document.getElementById("03H1Angka")
    const oImgAngkaCitra=document.getElementById("01AngkaCitra")

    function isiPilihHuruf(){
        oSelectPilihHuruf.innerHTML=""
        var oOpt=document.createElement("option")
        oOpt.value=""
        oOpt.innerHTML="--pilih huruf/angka--"
        oSelectPilihHuruf.appendChild(oOpt)
        for (abjadAngka of aAbjadAngka)
        {
            oOpt=document.createElement("option")
            oOpt.value=abjadAngka
            oOpt.innerHTML=abjadAngka
            oSelectPilihHuruf.appendChild(oOpt)
        }
    }

function onOfContohGerakan(oCheckbox)
{
    let oDivContohGerakan = document.getElementById("contohGerakan")
    let displaynya="block"
    let oCheckboxModeTuntun = document.getElementById("flexSwitchCheckCheckedModeTuntun")
    oCheckbox.value="On"
    
    if (!oCheckbox.checked)
    {
        displaynya="none"
        oCheckbox.value="Off"
        oCheckboxModeTuntun.checked=false
        oCheckboxModeTuntun.value="Off"
        oCheckboxModeTuntun.disabled=true
        
    }
    else
    {
        oCheckboxModeTuntun.disabled=false
    }
    oDivContohGerakan.style.display=displaynya
    
        
}

function onOfTinjau(oCheckbox)
{
    let oVideo = document.getElementsByTagName("video")[0]
    
    oCheckbox.value="On"
    
    if (!oCheckbox.checked)
    {
        oVideo.style.visibility="hidden"
        oCheckbox.value="Off"
        
    }
    else
    {
        oVideo.style.visibility="visible"
    }
    
    
        
}

function onOfLog(oCheckbox)
{
    let oDivLog = document.getElementById("logKontainer")
    let displaynya="block"
    oCheckbox.value="On"
    
    if (!oCheckbox.checked)
    {
        displaynya="none"
        oCheckbox.value="Off"
    }
    oDivLog.style.display=displaynya
    
        
}
isiPilihHuruf()
oSelectPilihHuruf.onchange=function(){
    oH1AngkaContoh.innerHTML=this.value
    oH1AngkaContoh.style.visibility="visible"
    oImgAngkaCitra.src="../dataimg/"+this.value+".jpg"
    oImgAngkaCitra.style.visibility="visible"
}

function tombolAngkaOn(oA){
    let sodaranya=oA.previousElementSibling
    oA.className="btn active"
    oA.style.backgroundColor="white"
    oA.style.color="black"
    
    sodaranya.className="btn"
    sodaranya.style.backgroundColor="black"
    sodaranya.style.color="white"
    oIsinya.innerHTML="\"\""
}

function tombolHurufOn(oA){
    let sodaranya=oA.nextElementSibling
    oA.className="btn active"
    oA.style.backgroundColor="white"
    oA.style.color="black"
    
    sodaranya.className="btn"
    sodaranya.style.backgroundColor="black"
    sodaranya.style.color="white"
    oIsinya.innerHTML="\"\""
}

function aktifkanHuruf(oA)
{
    pengenal="huruf"
    oIsinya.innerHTML="\"Tunggu...\""
    //cameraStop(camera);
    setTipePengenal(pengenal)
    loadDataReferensi(tombolHurufOn(oA));
}

  



function aktifkanAngka(oA)
{
    pengenal="angka"
    oIsinya.innerHTML="\"Tunggu...\""
    //cameraStop(camera);
    
    setTipePengenal(pengenal)
    loadDataReferensi(tombolAngkaOn(oA));
    //loadDataReferensi(function(){alert("hallo")})
    /*function(oA){
        alert(oA)
        let sodaranya=oA.previousElementSibling
    oA.className="btn active"
    oA.style.backgroundColor="white"
    oA.style.color="black"

    sodaranya.className="btn"
    sodaranya.style.backgroundColor="black"
    sodaranya.style.color="white"
    oIsinya.innerHTML="\"\""
    alert("ahllo")
    });*/
}


function addLog(oLognya)
{
    let oLogContainer=document.getElementById("logContainer")
    let oP1=oLogContainer.children[0];
    let oP=document.createElement("p")
    let oSpan=document.createElement("span")
    oP.style.margin="0px";
    oP.style.marginBottom="3px";
    
    oP.style.backgroundColor="white"
    oP.style.textAlign="left"
    oSpan.style.margin="3px"
    oSpan.innerHTML=oLognya.waktu+" \""+oLognya.hasilTerjemah+"\""
    oP.appendChild(oSpan)
    oLogContainer.insertBefore(oP,oP1)
}

