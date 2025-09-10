<?php
// Zapnutie chybového hlásenia
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Kontrola, či sme v XAMPP
if (!file_exists('C:\xampp\htdocs\js-homes')) {
    die('Prosím, presuňte súbory do C:\xampp\htdocs\js-homes');
}

// Nastavenie hlavičiek pre CORS
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Kontrola, či je požiadavka POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metóda nie je povolená']);
    exit;
}

// Získanie dát z formulára
$meno = $_POST['Meno'] ?? '';
$priezvisko = $_POST['Priezvisko'] ?? '';
$email = $_POST['Email'] ?? '';
$sprava = $_POST['Správa'] ?? '';

// Nastavenie emailových parametrov
$to = "umbre21@gmail.com";
$subject = "Nová správa z webovej stránky JS-Homes";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Vytvorenie HTML správy
$message = "
<html>
<head>
    <title>Nová správa z webovej stránky</title>
</head>
<body>
    <h2>Nová správa od návštevníka</h2>
    <p><strong>Meno:</strong> $meno $priezvisko</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Správa:</strong></p>
    <p>$sprava</p>
</body>
</html>
";

// Odoslanie emailu
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Nepodarilo sa odoslať email']);
}
?> 