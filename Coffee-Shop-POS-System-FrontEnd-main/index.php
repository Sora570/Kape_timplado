<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    header("Location: loginRegister.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kape Timplado's</title>
    <link rel="icon" href="assest/icon/icons8-coffee-shop-64.png">
    <link rel="stylesheet" href="css/Dashboard.css">
<!--    <link rel="stylesheet" href="css/Customer.css"> -->
    <link rel="stylesheet" href="css/Products.css">
    <link rel="stylesheet" href="css/Orders.css">
    <link rel="stylesheet" href="css/settings.css">

</head>
<body>
    <div id="container" class="container">
        <!-- ------------------------------------ Navgation Side Bar ------------------------------------ -->
        <div id="navigation" class="navigation">
            <ul>
                <li>
                    <a href="#">
                        <span class="icon"><img src="assest/image/logo.png" class="logo"></span>
                        <span class="title" style="font-size: 1.5em;font-weight: 500; margin-top: 15px;">Kape Timplado's</span>
                    </a>
                </li>
                <li class="hovered">
					<a href="#" id="Dashboard-button">
						<span class="icon"><ion-icon name="home-outline"></ion-icon></span>
						<span class="title">Dashboard</span>
					</a>
				</li>
                <li>
					<a href="#" id="ProductsForm-button">
						<span class="icon"><ion-icon name="color-fill-outline"></ion-icon></span>
						<span class="title">Products</span>
					</a>
				</li>
                <li>
					<a href="#" id="TransactionsForm-button">
						<span class="icon"><ion-icon name="reader-outline"></ion-icon></span>
						<span class="title">Transactions</span>
					</a>
				</li>
                <li>
                    <a href="#" id="SettingsForm-button">
                        <span class="icon"><ion-icon name="settings-outline"></ion-icon></span>
                        <span class="title">Settings</span>
                    </a>
                </li>
                <li>
					<a href="#" id="SignOutForm-button">
						<span class="icon"><ion-icon name="log-out-outline"></ion-icon></span>
						<span class="title">Sign Out</span>
					</a>
				</li>
            </ul>
        </div>

        <div class="main">
            <!-- ------------------------------------ Dashboard Form ------------------------------------ -->
            <section id="DashboardForm">
                <div class="topbar">
                    <div class="toggle">
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <!-- search -->
                    <div class="search">
                        <label>
                            <input type="text" placeholder="Search here">
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>
                    <!-- user -->
                    <div class="user-container">
                        <div class="user">
                            <img src="assest/image/User Image.jpg" alt="User">
                        </div>
                        <div id="userGreeting" class="user-greeting">
                            <?php echo "Hello, " . htmlspecialchars($_SESSION['username']) . "!"; ?>
                        </div>
                    </div>
                </div>
    
                <div class="cardBox">
                    <div class="card" id="customer">
                        <div>
                            <div class="numbers">10</div>
                            <div class="cardName">Customers</div>
                        </div>
                        <div class="iconBx">
                            <ion-icon name="people-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="card" id="product">
                        <div>
                            <div class="numbers">12</div>
                            <div class="cardName">Products</div>
                        </div>
                        <div class="iconBx">
                            <ion-icon name="color-fill-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="card" id="transactions">
                        <div>
                            <div class="numbers">227</div>
                            <div class="cardName">Transactions</div>
                        </div>
                        <div class="iconBx">
                            <ion-icon name="reader-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="card">
                        <div>
                            <div class="numbers">4</div>
                            <div class="cardName">Employees</div>
                        </div>
                        <div class="iconBx">
                            <ion-icon name="accessibility-outline"></ion-icon>
                        </div>
                    </div>    
                </div>
    
                <div class="charts">
                    <div class="charts-card">
                      <h2 class="chart-title">Top 5 Products</h2>
                      <div id="bar-chart"></div>
                    </div>
          
                    <div class="charts-card">
                      <h2 class="chart-title">Beverages & Desserts</h2>
                      <div id="area-chart"></div>
                    </div>
                </div>
            </section>

            <!-- ------------------------------------ Product Form ------------------------------------ -->
            <section id="ProductsForm" style="display:none;">
                <div class="productHeader-section">
                    <h2> Products <span>Manage</span></h2>
                </div>
                

                <!-- -------------- Unified Product Table -------------- -->
                <h3 style="margin-top: 10px;">Products with Sizes & Prices</h3>
                <div style="max-height:500px; overflow-y:auto;">
                    <table id="productTable" class="product-table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Size</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody id="product-table-list"></tbody>
                    </table>
                </div>

            </section>
            
            <!-- ------------------ Transactions Tab ------------------ -->
            <section id="TransactionsForm" style="display:none;">
                <h2>Transactions</h2>
                <table id="transactionsTable" class="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cashier</th>
                            <th>Summary</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </section>

            

            <!-- ------------------------------------ Settings Form ------------------------------------ -->
            <section id="SettingsForm" style="display:none;">
                <h2>Settings <span>Manage</span></h2>

                <div class="settings-top">
                    <div class="small-muted">Manage categories, products, sizes and add-ons</div>
                    <div>
                        <button id="refreshSettingsBtn">Refresh</button>
                    </div>
                </div>

                <div class="settings-column">
                    <h4>Sizes</h4>
                    <div class="controls">
                        <input type="text" id="newSizeName" placeholder="New size name">
                        <button id="addSizeBtn">Add Size</button>
                    </div>
                    <ul id="sizeList"></ul>
                </div>

            <div class="settings-pane">
                <!-- column: categories -->
                <div class="settings-column" id="settings-categories-view">
                    <h4>Categories</h4>
                    <div class="controls">
                        <input type="text" id="newCategory" placeholder="New category name">
                        <button id="addCategory">Add</button>
                    </div>
                    <ul id="categoryList" style="margin-top:12px;"></ul>
                </div>

                <!-- column: products list -->
                <div class="settings-column" id="settings-products-view">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <h4 id="selectedCategoryName">Select a category</h4>
                        <div>
                            <button id="backToCategories" class="hidden">Back</button>
                            <button id="addProductBtn" class="hidden">+ Add Product</button>
                        </div>
                    </div>

                    <table class="product-table" id="productListTable" style="margin-top:10px;">
                        <thead>
                            <tr><th>ID</th><th>Product</th><th>Active</th><th>Actions</th></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <!-- column: product form -->
                <div class="settings-column" id="settings-product-form-view" style="display:none;">
                    <h4 id="productFormTitle">Product</h4>
                        <form id="productForm">
                            <input type="hidden" id="productID" name="productID">
                            <label>Product Name</label>
                            <input type="text" id="productName" name="productName" required>

                            <label>Category</label>
                            <select id="productCategory" name="categoryID" required></select>

                            <label>Sizes & Prices</label>
                            <div id="sizePriceContainer" style="margin-bottom:10px;"></div>

                            <label>Add-ons</label>
                            <div id="addonsContainer" style="margin-bottom:10px;"></div>

                            <label><input type="checkbox" id="isActive" name="isActive" checked> Active</label>

                            <div style="margin-top:12px;">
                                <button type="submit" id="saveProductBtn">Save</button>
                                <button type="button" id="cancelProductBtn">Cancel</button>
                            </div>
                        </form>
                </div>
            </div>
            </section>




            <div id="toast" class="toast"></div>


        </div>    

        
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
	<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.51.0/apexcharts.min.js"></script>

<!--<script src="/db/db.js"></script>  -->    
    <script src="js/Dashboard.js"></script>
    <script src="js/Navigation.js"></script>
<!--    <script src="js/Customer.js"></script> -->
    <script src="js/Products.js"></script>
<!--    <script src="js/Orders.js"></script> -->
<!--    <script src="js/logs.js"></script> -->
    <script src="js/Settings.js"></script>
    
    

</body>
</html>