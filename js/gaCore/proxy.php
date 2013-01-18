$url = 'http://othersite.com/someservice?' . http_build_query($_GET);
echo file_get_contents($url);
