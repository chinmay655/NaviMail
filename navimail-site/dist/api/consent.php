
<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $saved): void {
    http_response_code($status);
    echo json_encode(['saved' => $saved]);
    exit;
}

// Allow only POST requests
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false);
}

// Check requests come from the same website
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$siteHost = strtolower(
    preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '')
);
$originHost = $origin === ''
    ? $siteHost
    : parse_url($origin, PHP_URL_HOST);

if (!is_string($originHost)
    || strtolower($originHost) !== $siteHost) {
    respond(403, false);
}

// Receive React consent data
$raw = file_get_contents('php://input', false, null, 0, 4097);

if ($raw === false || strlen($raw) > 4096) {
    respond(413, false);
}

$data = json_decode($raw, true);

$choice = $data['choice'] ?? null;
$statistics = $data['statistics'] ?? null;
$marketing = $data['marketing'] ?? null;

// Validate consent choices
if (!in_array($choice, ['accepted', 'denied', 'customized'], true)
    || !is_bool($statistics)
    || !is_bool($marketing)) {
    respond(422, false);
}

// Read the IP address seen by the server
$ip = $_SERVER['REMOTE_ADDR'] ?? '';

if (!filter_var($ip, FILTER_VALIDATE_IP)) {
    respond(500, false);
}

// Save outside public_html so visitors cannot read the log
$documentRoot = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');

if ($documentRoot === false
    || $documentRoot === DIRECTORY_SEPARATOR) {
    respond(500, false);
}

$logDirectory = dirname($documentRoot)
    . '/private-consent-logs';

if (!is_dir($logDirectory)
    && !@mkdir($logDirectory, 0700, true)) {
    respond(500, false);
}

$logFile = $logDirectory . '/consent-log.csv';

$file = @fopen($logFile, 'c+');

if (!$file) {
    respond(500, false);
}

@chmod($logFile, 0600);

if (!flock($file, LOCK_EX)) {
    fclose($file);
    respond(500, false);
}

fseek($file, 0, SEEK_END);
$empty = ftell($file) === 0;
$ok = true;

// Add CSV headings for the first record
if ($empty) {
    $ok = fputcsv($file, [
        'timestamp_utc',
        'full_ip',
        'decision',
        'functional',
        'statistics',
        'marketing',
        'record_id'
    ], ',', '"', '') !== false;
}

// Save visitor's decision
if ($ok) {
    $ok = fputcsv($file, [
        gmdate('Y-m-d H:i:s'),
        $ip,
        $choice,
        1,
        (int) $statistics,
        (int) $marketing,
        bin2hex(random_bytes(8))
    ], ',', '"', '') !== false;
}

fflush($file);
flock($file, LOCK_UN);
fclose($file);

respond($ok ? 200 : 500, $ok);
