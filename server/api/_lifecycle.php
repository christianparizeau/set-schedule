<?php

$request = [
  'method' => $_SERVER['REQUEST_METHOD'],
  'path' => parse_url($_SERVER['REQUEST_URI'])['path'],
  'headers' => getallheaders(),
  'query' => $_GET,
  'body' => json_decode(file_get_contents('php://input'), true) ?? []
];

$response = [
  'status' => 200,
  'headers' => [
    'Content-Type' => 'application/json; charset=utf-8'
  ]
];

function send(&$response)
{
  http_response_code($response['status']);
  if (!array_key_exists('body', $response)) {
    unset($response['headers']['Content-Type']);
  }
  foreach ($response['headers'] as $key => $value) {
    header("$key: $value");
  }
  if (array_key_exists('body', $response)) {
    print(json_encode($response['body']));
  } else {
    print('');
  }
  exit;
}


class ApiError extends Error
{
}

set_exception_handler(function ($error) {
  if ($error instanceof ApiError) {
    $status = $error->getCode();
    $message = $error->getMessage();
  } else {
    error_log($error);
    $status = 500;
    $message = 'An unexpected error occurred.';
  }
  $response = [
    'status' => $status,
    'headers' => [
      'Content-Type' => 'application/json; charset=utf-8'
    ],
    'body' => [
      'error' => $message
    ]
  ];
  send($response);
});
