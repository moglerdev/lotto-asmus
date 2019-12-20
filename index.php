<?php
    session_start();

    if(isset($_GET["age"])){
        $_SESSION['valid_age'] = $_GET['age'] == "true" ? true : false;
    }
?>
<!DOCTYPE html>
<html lang="de">
    <!-- 2019 (c) Copyrights by Asmus, Bartsch, Pauli -->
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <title>Lotto-Worlds - by Asmus, Bartsch, Pauli</title>
        <link rel="stylesheet" href="public/index.css">
    </head>
    <body>
        
<?php 
    if(isset($_SESSION["valid_age"]) && $_SESSION["valid_age"] == true){
?>
        <div class="lotto-brand">
            <span class="brand">Lotto-Worlds <span id="game_title"></span></span>
            <img alt="Lotto Worlds" class="icon" src="img/LOTTO.png">
        </div>
    
        <div class="content">
            <div class="lotto-columns" id="columns">
            </div>
            <div class="lotto-board">
                <div class="board-columns" id="board_columns">
                </div>
                <div class="board-controller">
                    <label for="rowCounter">Wie viele Ziehungen sollen durchlaufen werden?</label>
                    <input id="rowCounter" type="number" min="1" max="1000" name="rowCount">
                    <hr />
                    <div class="btn-group">
                        <button type="button" class="btn btn-lg btn-success" onclick="Lotto.sendData()">Absenden <i class="fas fa-paper-plane"></i></button>
                        <a class="btn btn-lg btn-info" tabindex="0" id="create_new" target="_blank" href="#">Neu <i class="fas fa-plus-circle"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <!--<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Lottoschein.jpg"> -->
        <footer>
            <div class="copyrights">
                <span class="date-now"></span> &copy; Copyrights by Asmus, Bartsch, Pauli
            </div>
        </footer>

        <!-- Modal -->
        <div class="modal active" id="modal_select_country">
            <div class="modal-content">
                <div class="modal-head">
                    <h2>Wählen Sie ihr Spiel / Land aus:</h2>
                </div>
                <div class="modal-body">
                    <div class="countrys" id="countrys">
                    </div>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>

        <div class="modal" id="modal_create_game">
            <div class="modal-content">
                <div class="modal-head">
                    <h2>Lotto-Spiel erstellen:</h2>
                    <button type="button" class="btn modal-close" title="Auswertung schließen?" 
                        onclick="document.getElementById('modal_create_game').classList.toggle('active', false);"><i class="fa fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <label for="title">Titel:</label>
                    <input id="title" name="title" class="form-control" type="text" placeholder="Spieltitel">
                    <span class="form-error" data-for="title"></span>

                    <label for="count">Zahlen:</label>
                    <input id="count" name="count" class="form-control" type="number" placeholder="Wie viele Zahlen stehen zur Auswahl?" min="1" max="1000" data-validate>
                    <span class="form-error" data-for="count"></span>

                    <label for="max">Auswählen:</label>
                    <input id="max" name="max" class="form-control" type="number" placeholder="Wie viele Zahlen müssen ausgewählt werden?" min="1"  max="200" data-validate>
                    <span class="form-error" data-for="max"></span>

                    <label for="columns">Felder:</label>
                    <input id="columns" name="columns" class="form-control" type="number" placeholder="Anzahl der Felder?" min="1" max="20" data-validate>
                    <span class="form-error" data-for="columns"></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-lg btn-success" id="btn_create_game">Starten</button>
                </div>
            </div>
        </div>

        <div class="modal " id="modal_draw">
            <div class="modal-content">
                <div class="modal-head">
                    <h2 class="modal-brand">Auswertung</h2>
                    <button type="button" data-close-modal class="btn modal-close" title="Auswertung schließen?"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body data">
                    <table id="ev_equals"></table>
                    <hr/>
                    <table id="ev_draws"></table>
                </div>
                <div class="modal-footer">
                    <button id="exportData" type="button" class="btn btn-lg btn-success" onclick="Lotto.exportData()">Auswertung exportieren? <i class="fas fa-file-export"></i></button>
                </div>
            </div>
        </div>
          
<?php 
    }else{
?>
    <div class="modal active" id="modal_valid_age">
            <div class="modal-content">
                <div class="modal-body">
                    <h3>Leider dürfen Sie diese Seite nicht besuchen!</h3>
                    <a class="btn btn-lg btn-danger" href="?age=true">Trotzdem Spielen?</a>
                </div>
            </div>
        </div>
<?php
    }
?>
<?php 
    if(!isset($_SESSION["valid_age"])){
?>
        <div class="modal active" id="modal_valid_age">
            <div class="modal-content">
                <div class="modal-body">
                    <h3>Sind Sie 18 Jahre oder älter?</h3>
                    <a class="btn btn-lg" style="width: 10rem" href="?age=true">Ja</a>
                    <a class="btn btn-lg btn-success"  style="width: 20rem" href="?age=false">Nein</a>
                </div>
            </div>
        </div>
<?php
}
?>
        <div class="modal" id="modal_wait">
            <div class="modal-content">
                <div class="modal-body">
                    <h3>Bitte warten ... <i class="fas fa-spin fa-spinner"></i></h3>
                </div>
            </div>
        </div>

        <script src="public/lotto.js"></script>
        <script>
            [].forEach.call(document.getElementsByClassName('date-now'), item => {
                item.innerText = (new Date).getFullYear();
            });

            Lotto.init();

            //Lotto.TEST('LOTTO', 20000);

            document.getElementById('create_new').href = window.location.href;
        </script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-154860827-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-154860827-1');
        </script>

        <!--<script src="http://www.perschke.info/webprog/validi/validiIntern.min.js"></script>-->
    </body>
</html>