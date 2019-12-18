// 2019 (c) Copyrights by Asmus, Bartsch, Pauli

// Fakultäts-Funktion
const FACT = function(iterator){
    let out = 1;

    if(iterator == null || iterator < 0){
        throw "Ungültiger Wert für Iterator!";
    }

    for(var i = 2; i <= iterator; ++i){
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
    },
    getCountry: function(iso_code){
        let result = this[iso_code];
        if(!result || iso_code === "getCountry"){
            throw "Dieser ISO-Code ist nicht hinterlegt!";
        }
        return result;
    }
}

var Lotto = {
    init: function(el){
        this.$el = document.getElementById(el);
        if(!this.$el){
            throw "Lotto konnte nicht initialisiert werden!";
        }
    },
    data: {
        $el: null, 
        pages: [],
        currentPage: -1,
        country: null
    },
    helper: {
        generateCountryButtons: function(){
            let countrySelection = document.createElement('div');
            countrySelection.className = 'country-select';

            Object.entries(COUNTRY).forEach(function([key, value]){
                if(key !== "getCountry"){
                    console.log(key, value);
                    let btn = document.createElement('button');
                    btn.className = 'select-btn'
                    btn.title = value.title;
                    
                    let img = document.createElement('img');
                    img.src = value.img;

                    btn.appendChild(img);

                    countrySelection.appendChild(btn);
                }
            });
            console.log(this.data.$el);

            this.$el.appendChild(countrySelection);
        },

        generatePage: function(){        
            var lottoPage = document.createElement('div');
            lottoPage.dataset.pageIndex = this.data.pages.length;
            lottoPage.dataset.className = 'lotto-page';

            if(!lottoPage){
                throw "Das DOM Element für die Lottozahlen konnte nicht gefunden werden, bitte starten Sie die Seite neu!";
            } 

            lottoPage.innerHTML = "";

            for(var i = 0; i < this.data.country.count; ++i){
                lottoPage.appendChild(this.createNumberButton(i + 1));
            }
        },

        createNumberButton: function(num){
            let numBtn = document.createElement('button');

            numBtn.innerText = num;
            numBtn.className = "btn-num";
            numBtn.dataset.num = num;
            numBtn.dataset.selected = false;

            numBtn.addEventListener('click', function(e) { this.events.numberBtnClicked(this, eventArgs) });

            return numBtn;
        },

    },
    events: {
        numberBtnClicked: function(sender, eventArgs){
            var isActivated = this.dataset.selected === "false";

            if(isActivated && lotto.getNumberCount() >= lotto.data.country.max){
                e.preventDefault();
                alert("Sie können keine weitere Zahl mehr angeben!");
                return;
            }                
            
            this.dataset.selected = isActivated;
            this.classList.toggle('active', isActivated);
            
            if(isActivated){
                lotto.addNumber(0, this.dataset.num);
            }else{
                lotto.removeNumber(0, this.dataset.num);
            }
        }
    },
    setCountry: function(country_iso_code){
        this.data.country = COUNTRY.getCountry(country_iso_code);
        this.data.pages = [];
        this.data.pages[0] = [];
        this.data.currentPage = 0;
    },
}