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
        max: 6,
        columns: 12
    },
    BEL: { // Belgien
        title: 'Belgien',
        img: 'img/BEL.png',
        count: 45,
        max: 6,
        columns: 14
    },
    DNK:{  // Dänemark
        title: 'Dänemark',
        img: 'img/DNK.png',
        count: 36,
        max: 7,
        columns: 10
    },
    USA: { // United States of Amerika (USA)
        title: 'USA',
        img: 'img/USA.png',
        count: 69,
        max: 5,
        columns: 6
    },
    getCountry: function(iso_code){
        let result = this[iso_code.toUpperCase()];
        if(!result || iso_code === "getCountry"){
            throw "Dieser ISO-Code ist nicht hinterlegt!";
        }
        return result;
    }
}

var Lotto = {

    init: function(){
        this.setCountry('USA');
    },

    data: {
        columns: [],
        country: null
    },

    helper: {
        generateColumn: function(){        
            let columnIndex = Lotto.data.columns.length;

            let lottocolumn = document.createElement('div');
            lottocolumn.dataset.column = columnIndex;
            lottocolumn.className = 'column';
            Lotto.data.columns[columnIndex] = [];

            if(!lottocolumn){
                throw "Das DOM Element für die Lottozahlen konnte nicht gefunden werden, bitte starten Sie die Seite neu!";
            } 

            lottocolumn.innerHTML = "";

            for(let i = 0; i < Lotto.data.country.count; ++i){
                lottocolumn.appendChild(this.createNumberButton(columnIndex, i + 1));
            }

            let lottoInfo = document.createElement('div');
            lottoInfo.className = "column";
            lottoInfo.dataset.column = columnIndex;

            let infoBrand = document.createElement('div');
            infoBrand.className = "column-id";
            infoBrand.innerText = "Zelle " + (columnIndex + 1);
            
            let infoSelection = document.createElement('div');
            infoSelection.className = "selection";
            
            lottoInfo.appendChild(infoBrand);
            lottoInfo.appendChild(infoSelection);

            document.getElementById('columns').appendChild(lottocolumn);
            document.getElementById('board_columns').appendChild(lottoInfo);
        },

        renderBoardColumn: function(columnIndex){
            let columnInfo = document.getElementById('board_columns').querySelector('.column[data-column="'+columnIndex+'"]');
            if(!columnInfo){
                console.log(columnIndex);
                return; // Todo create new Board info
            }
    
            console.log(columnInfo);
            let numbs = Lotto.data.columns[columnIndex].sort(function(a, b) { return a - b; });
            if(!numbs){
                columnInfo.remove();
            }
    
            let numbsInfo = columnInfo.querySelector('.selection');
            numbsInfo.innerHTML = '';
    
            for(var i = 0; i < numbs.length; ++i)
            {
                console.log(i);
                let ni = document.createElement('span');
                ni.className = 'number';
                ni.innerText = numbs[i];
    
                numbsInfo.appendChild(ni);
            }
        },

        createNumberButton: function(columnIndex, num){
            let numBtn = document.createElement('button');

            numBtn.innerText = num;
            numBtn.className = "btn-num";
            numBtn.dataset.num = num;
            numBtn.dataset.selected = false;
            numBtn.dataset.column = columnIndex;

            numBtn.addEventListener('click', function(eventArgs) { Lotto.events.numberBtnClicked(this, eventArgs) });

            return numBtn;
        },

        getNumberCount: function(columnIndex){
            columnIndex = Number.parseInt(columnIndex);
            return Lotto.data.columns[columnIndex].length;
        }
    },

    events: {
        numberBtnClicked: function(sender, eventArgs){
            let isActivated = sender.dataset.selected === "false";

            if(isActivated && Lotto.helper.getNumberCount(sender.dataset.column) >= Lotto.data.country.max){
                eventArgs.preventDefault();
                alert("Sie können keine weitere Zahl mehr angeben!");
                return;
            }
            
            sender.dataset.selected = isActivated;
            sender.classList.toggle('active', isActivated);
            
            if(isActivated){
                Lotto.addNumber(sender.dataset.column, sender.dataset.num);
            }else{
                Lotto.removeNumber(sender.dataset.column, sender.dataset.num);
            }
        }
    },

    setCountry: function(country_iso_code){
        let cntry = COUNTRY.getCountry(country_iso_code);
        Lotto.data.country = cntry;
        Lotto.data.columns = [];

        for(let i = 0; i < cntry.columns; ++i){
            Lotto.helper.generateColumn();
        }
    },

    addNumber: function(columnIndex, val){
        columnIndex = Number.parseInt(columnIndex);
        let column = this.data.columns[columnIndex];
        column[column.length] = val;

        this.helper.renderBoardColumn(columnIndex);
    },

    removeNumber: function(columnIndex, val){
        columnIndex = Number.parseInt(columnIndex);
        let column = this.data.columns[columnIndex];
        let index = column.indexOf(val);
        if(index > -1){
            column.splice(index, 1);
        }

        this.helper.renderBoardColumn(columnIndex);
    },

    validData: function(){

        return false;
    }
}