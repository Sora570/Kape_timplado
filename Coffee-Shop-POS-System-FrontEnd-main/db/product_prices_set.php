<?php
// product_prices_set.php
// include after db_connect in parent scope
$pid = intval($_POST['productID'] ?? 0);
if (!$pid) { return; }

// fetch all sizes
$res = $conn->query("SELECT sizeID FROM sizes");
$sizeIds = [];
while ($r = $res->fetch_assoc()) $sizeIds[] = $r['sizeID'];

// clean existing for product
$del = $conn->prepare("DELETE FROM product_prices WHERE productID=?");
$del->bind_param("i",$pid); $del->execute();

// insert again if provided
$ins = $conn->prepare("INSERT INTO product_prices (productID, sizeID, price) VALUES (?,?,?)");
foreach ($sizeIds as $sid) {
    $key = "price_".$sid;
    if (isset($_POST[$key]) && $_POST[$key] !== "") {
        $price = floatval($_POST[$key]);
        $ins->bind_param("iid", $pid, $sid, $price);
        $ins->execute();
    }
}
