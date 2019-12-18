// 2019 (c) Copyrights by Asmus, Bartsch, Pauli

// Fakultäts-Funktion
const FACT = function(iterator){
    let out = 1;

    if(iterator == null || iterator < 0){
        throw "Ungültiger Wert für Iterator!";
    }

    for(let i = 2; i <= iterator; ++i){
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

    init: function(){
        this.setCountry('DEU');
    },

    data: {
        pages: [],
        country: null
    },

    helper: {
        generatePage: function(){        
            let lottoPage = document.createElement('div');
            lottoPage.dataset.page = Lotto.data.pages.length - 1;
            lottoPage.className = 'page';

            let pageIndex = Lotto.data.pages.length;
            Lotto.data.pages[pageIndex] = [];

            if(!lottoPage){
                throw "Das DOM Element für die Lottozahlen konnte nicht gefunden werden, bitte starten Sie die Seite neu!";
            } 

            lottoPage.innerHTML = "";

            for(let i = 0; i < Lotto.data.country.count; ++i){
                lottoPage.appendChild(this.createNumberButton(pageIndex, i + 1));
            }

            document.getElementById('pages').appendChild(lottoPage);
        },

        createNumberButton: function(pageIndex, num){
            let numBtn = document.createElement('button');

            numBtn.innerText = num;
            numBtn.className = "btn-num";
            numBtn.dataset.num = num;
            numBtn.dataset.selected = false;
            numBtn.dataset.page = pageIndex;

            numBtn.addEventListener('click', function(eventArgs) { Lotto.events.numberBtnClicked(this, eventArgs) });

            return numBtn;
        },

        getNumberCount: function(pageIndex){
            pageIndex = Number.parseInt(pageIndex);
            console.log(pageIndex);
            return Lotto.data.pages[pageIndex].length;
        }
    },

    events: {
        numberBtnClicked: function(sender, eventArgs){
            let isActivated = sender.dataset.selected === "false";

            if(isActivated && Lotto.helper.getNumberCount(sender.dataset.page) >= Lotto.data.country.max){
                eventArgs.preventDefault();
                alert("Sie können keine weitere Zahl mehr angeben!");
                return;
            }                
            
            sender.dataset.selected = isActivated;
            sender.classList.toggle('active', isActivated);
            
            if(isActivated){
                Lotto.addNumber(sender.dataset.page, sender.dataset.num);
            }else{
                Lotto.removeNumber(sender.dataset.page, sender.dataset.num);
            }
        }
    },

    setCountry: function(country_iso_code){
        Lotto.data.country = COUNTRY.getCountry(country_iso_code);
        Lotto.data.pages = [];

        for(let i = 0; i < 12; ++i){
            Lotto.helper.generatePage();
        }
    },

    addNumber: function(pageIndex, val){
        pageIndex = Number.parseInt(pageIndex);
        let page = this.data.pages[pageIndex];
        page[page.length] = val;
    },

    removeNumber: function(pageIndex, val){
        pageIndex = Number.parseInt(pageIndex);
        let page = this.data.page[pageIndex];
        let index = page.indexOf(val);
        if(index > -1){
            page.splice(index, 1);
        }
    }
}