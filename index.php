<!DOCTYPE html>
<html lang="de">
    <!-- 2019 (c) Copyrights by Asmus, Bartsch, Pauli -->
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <title>Asmus-Abzockersimulator</title>
        <link rel="stylesheet" href="public/index.css">
    </head>
    <body>
        
        <div class="lotto-brand">
            <span class="brand">Asmus-Abzockersimulator</span>
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
                        <button class="btn btn-lg btn-success" onclick="Lotto.sendData()">Absenden <i class="fas fa-paper-plane"></i></button>
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
                    <h2>Wählen Sie ihr Land aus:</h2>
                </div>
                <div class="modal-body">
                    <div class="countrys" id="countrys">
                    </div>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>

        <div class="modal " id="modal_draw">
            <div class="modal-content">
                <div class="modal-head">
                    <h2 class="modal-brand">Auswertung</h2>
                    <button class="btn modal-close" title="Auswertung schließen?" onclick="document.getElementById('modal_draw').classList.toggle('active', false)"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body data">
                    <table id="ev_equals"></table>
                    <hr/>
                    <table id="ev_draws"></table>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-lg btn-success" onclick="Lotto.exportData()">Auswertung exportieren? <i class="fas fa-file-export"></i></button>
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
        <!--<script src="http://www.perschke.info/webprog/validi/validiIntern.min.js"></script>-->
    </body>
</html>