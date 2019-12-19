
const FACT = function(it){
    if(it < 0){
        throw "Iterator darf nicht kleiner sein als 0!";
    }
    
    let out = 1;

    for(var i = 2; i <= it; ++i){
        out *= i;
    }
    return out;
}

// Hier werden alle Länder mit deren Lotto informationen gespeichert.
// Key value ist der ISO-Code des Landes.
const COUNTRY = {
    DEU: { // Deutschland
        title: 'Deutschland',
        img: 'img/DEU.png',
        count: 49,
        max: 6
    },
    BEL: { // Belgien
        title: 'Belgien',
        img: 'img/BEL.png',
        count: 45,
        max: 6
    },
    DNK:{  // Dänemark
        title: 'Dänemark',
        img: 'img/DNK.png',
        count: 36,
        max: 7
    },
    USA: { // United States of Amerika (USA)
        title: 'USA',
        img: 'img/USA.png',
        count: 69,
        max: 5
    }
}
var lotto = {
    pageID: 'lottoPage',
    pages: [],
    currentPage: -1,
    country: null,
    init: function(){
    },

    selectCountry: function(iso_code) {
        this.country = this.getCountry(iso_code);
        this.numbers = [];

        var lottoPage = document.getElementById(this.pageID);

        if(!lottoPage){
            throw "Das DOM Element für die Lottozahlen konnte nicht gefunden werden, bitte starten Sie die Seite neu!";
        } 

        lottoPage.innerHTML = "";

        var numBtn;

        for(var i = 0; i < this.country.count; ++i){
            numBtn = document.createElement('button');

            numBtn.innerText = i + 1;
            numBtn.className = "btn-num";
            numBtn.dataset.num = i + 1;
            numBtn.dataset.selected = false;

            numBtn.addEventListener('click', function(e){
                var isActivated = this.dataset.selected === "false";

                if(isActivated && lotto.getNumberCount() >= lotto.country.max){
                    e.preventDefault();
                    alert("Sie können keine weitere Zahl mehr angeben!");
                    return -1;
                }                
                
                this.dataset.selected = isActivated;
                this.classList.toggle('active', isActivated);
                
                if(isActivated){
                    lotto.addNumber(0, this.dataset.num);
                }else{
                    lotto.removeNumber(0, this.dataset.num);
                }

                console.log(isActivated)
                e.preventDefault();
            });

            lottoPage.appendChild(numBtn);
        }
    },

    getPage: function(page){

    },

    addPage: function(){
        this.pages[this.pages.length] = [];
    },

    removePage: function(index){
        this.pages.splice(index, 1);
    },

    getNumberCount: function(page){
        return (this.pages[page] || []).length;
    },

    addNumber: function(page, val){
        var numIndex = this.pages[page].length;
        if(!numIndex){
            numIndex = 0;
        }

        this.pages[this.currentPage][numIndex] = val;
    },
    removeNumber: function(page, val){
        var numIndex = this.pages[page].indexOf(val);
        if(numIndex !== -1){
            this.pages[page].splice(numIndex, 1);
        }
    },
    getProability = function(iso_code, count){
        let country = COUNTRY[iso_code];
        if()
    },
    getCountry: function(iso_code){
        let cntry = COUNTRY[iso_code];

        if(!cntry){
            throw "Der ISO-Code ist nicht bekannt, geben Sie eine gültigen ISO-Code ein!";
        }

        return cntry;
    }
}
