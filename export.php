<?php
/// 2019 (c) Copyrights by Asmus, Bartsch, Pauli

    $_POST = json_decode(file_get_contents('php://input'), true);

    require 'vendor/autoload.php';

    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

    $firstHtmlString = $_POST['data'];

    $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();
    $spreadsheet = $reader->loadFromString($firstHtmlString);

    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');

    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment; filename="file.xls"');
    $writer->save("php://output");
?>