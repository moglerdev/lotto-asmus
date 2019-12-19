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

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
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
    LOTTO:{
        title: 'Lotto Worlds',
        img: 'img/LOTTO.png',
        count: 30,
        max: 5,
        columns: 8
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
        let countryDiv = document.getElementById('countrys');
        
        Object.entries(COUNTRY).forEach(function([key, value]){
            if(key === "getCountry")
                return;
                
            let btn = document.createElement('button');
            let img = document.createElement('img');
            img.src = value.img;
            img.alt = value.title;

            btn.appendChild(img);
            btn.className = 'btn-country';
            btn.title = value.title;
            btn.addEventListener('click', function(eventArgs){
                document.getElementById('modal_select_country').classList.remove('active');
                Lotto.setCountry(key);
            });

            countryDiv.appendChild(btn);
        });

        document.getElementById('rowCounter').addEventListener('change', function(eventArgs){
            Lotto.events.rowCountChanged(this, eventArgs);
        });
    },

    data: {
        columns: [],
        country: null,
        rowCounter: -1
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
            infoBrand.innerText = "Feld " + (columnIndex + 1);
            
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
                return; // Todo create new Board info
            }
    
            let numbs = Lotto.data.columns[columnIndex].sort(function(a, b) { return a - b; });
            if(!numbs){
                columnInfo.remove();
            }
    
            let numbsInfo = columnInfo.querySelector('.selection');
            numbsInfo.innerHTML = '';
    
            for(var i = 0; i < numbs.length; ++i)
            {
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
        },

        createEvaluation: async function(data){
            let modalDraw = document.getElementById('modal_draw');
            modalDraw.classList.add('active');

            await this.createDrawTable(data.draws);
            this.createEqualsTable(data.equals);

        },

        createDrawTable: async function(data){
            let dr = document.getElementById('ev_draws');
            dr.innerHTML = '<thead><tr><td colspan=7><h3>Ziehungen</h3></td></tr><thead><tbody><tbody>';
            let rowH = document.createElement('tr');

            let colH = document.createElement('th');
            colH.innerText = '#';
            rowH.append(colH);

            let sleep = data.length < 20;

            for(let e = 0; e < data.length; ++e){
                if(sleep)
                    await Sleep(1000);

                let row = document.createElement('tr');
                let col = document.createElement('td');
                col.innerText = "Feld "+(e + 1);
                row.append(col);
                
                for(let c = 0; c < Lotto.data.country.max; ++c){
                        
                    col = document.createElement('td');
                    col.innerText = data[e][c] || 0;

                    row.append(col);
                }

                dr.tBodies[0].append(row);
            }
        },

        createEqualsTable: function(data){
            let eq = document.getElementById('ev_equals');
            eq.innerHTML = '<thead><tr><td colspan=7><h3>Anzahl der Übereinstimmungen</h3></td></tr></thead><tbody></tbody>';
            let rowH = document.createElement('tr');

            let colH = document.createElement('th');
            colH.innerText = '#';
            rowH.append(colH);

            for(let c = 0; c < Lotto.data.country.max; ++c){
                colH = document.createElement('th');

                colH.innerText = c < Lotto.data.country.max - 1 ? (c + 1) + " Richtig" + (c === 0 ? '' : 'e') : "Alle richtig";
                rowH.append(colH);
            }

            eq.tHead.append(rowH);
            
            for(let e = 0; e < data.length; ++e){
                let row = document.createElement('tr');
                let col = document.createElement('td');
                col.innerText = "Feld "+(e + 1);
                row.append(col);
                
                for(let c = 0; c < Lotto.data.country.max; ++c){
                        
                    col = document.createElement('td');
                    col.innerText = data[e][c] || 0;

                    row.append(col);
                }

                eq.tBodies[0].append(row);
            }
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
        },

        rowCountChanged: function(sender, eventArgs){
            Lotto.data.rowCounter = Number.parseInt(sender.value);
        }
    },

    clear: function(){
        this.data.columns = [];
        this.data.country = null;

        document.getElementById('columns').innerHTML = '';
        document.getElementById('board_columns').innerHTML = '';
    },

    setCountry: function(country_iso_code){
        this.clear();

        let cntry = COUNTRY.getCountry(country_iso_code);
        this.data.country = cntry;

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

    sendData: function(){
        if(this.validData()){
            let req = new XMLHttpRequest();
            req.open('POST', 'draw.php');
            req.setRequestHeader('Content-Type', 'application/json');

            req.addEventListener('load', function(eventArgs){
                if(req.statusText === "OK"){
                    let result;
                    try {
                        result = JSON.parse(req.responseText);
                        Lotto.helper.createEvaluation(result);
                        console.log(result);
                    } catch (error) {
                        console.error(error);
                        alert("Es ist ein Fehler entstanden! Versuchen Sie es nochmal!")
                    }
                    
                }
            });

            req.send(JSON.stringify(this.data));
        }
    },

    validData: function(){
        let isFill = false;

        for(let column of this.data.columns){
            if(column.length > 0){
                isFill = true;

                if(column.length !== this.data.country.max){
                    alert("Bitte Füllen Sie alle Felder ordnungsgemäß aus!");
                    return false;
                }
            }
        }

        if(isFill === false){
            alert("Bitte min. 1 Feld befüllen!");
            return false;
        }

        return true;
    },   

    TEST: function(iso, counter){
        let country = COUNTRY.getCountry(iso);
        this.data.country = country;

        for(let i = 0; i < country.columns; ++i){
            let val = [];
            for(let c = 0; c < country.max; ++c){
                val[c] = Math.floor(Math.random() * Math.floor(country.count)) + 1;
            }
            this.data.columns[i] = val;
        }

        this.data.rowCounter = counter;
    },
}