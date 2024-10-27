const express = require("express");
const cors = require("cors");
const dataService = require("./services/dataServices");
const server = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { Product, addProduct } = require('./services/db'); // Import addProduct

server.use(cors());
server.use(bodyParser.json());
server.use(express.json());

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

// application specific middleware
const appMiddleware = (req, res, next) => {
  console.log("inside application middleware");
  next();
};

server.use(appMiddleware);

// food-app front end request resolving

//token verify middleware
const jwtMiddleware = (req, res, next) => {
  console.log("inside router specific middleware");
  //get token from req headers
  const token = req.headers["access-token"];
  console.log(token);
  try {
    //verify token
    const data = jwt.verify(token, "B68DC6BECCF4A68C3D8D78FE742E2");
    req.email = data.email;
    console.log("valid token");
    next();
  } catch {
    console.log("invalid token");
    res.status(401).json({
      message: "Please Login!",
    });
  }
};

//register api call
server.post("/register", (req, res) => {
  console.log("inside register api");
  console.log(req.body);
  //async
  dataService
    .register(req.body.username, req.body.email, req.body.password)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

//login api call
server.post("/login", (req, res) => {
  console.log("inside login api");
  console.log(req.body);
  //async
  dataService.login(req.body.email, req.body.password).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// all products api
server.get("/all-products", (req, res) => {
  dataService.allProducts().then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// view product api
server.get("/view-product/:productId", (req, res) => {
  dataService.viewProduct(req.params.productId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// add to wishlist a  product jwtmiddleare used to verify token during login
server.post("/addToWishlist", jwtMiddleware, (req, res) => {
  console.log("inside addtowishlist api");
  //async
  dataService
    .addToWishlist(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// wishlist a  product jwtmiddleare used to verify token during login
server.put("/removeFromWishlist", jwtMiddleware, (req, res) => {
  console.log("inside removeFromWishlist api");
  //async
  dataService
    .removeFromWishlist(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

//  addToCart
server.post("/addToCart", jwtMiddleware, (req, res) => {
  console.log("inside addToCart api");
  //async
  dataService
    .addToCart(req.body.email, req.body.productId, req.body.count)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// removeFromCart
server.put("/removeFromCart", jwtMiddleware, (req, res) => {
  console.log("inside removeFromWishlist api");
  //async
  dataService
    .removeFromCart(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// removeFromCart
server.put("/updateCartItemCount", jwtMiddleware, (req, res) => {
  console.log("inside updateCartItemCount api");
  //async
  dataService
    .updateCartItemCount(req.body.email, req.body.productId, req.body.count)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});
// emptyCart
server.put("/emptyCart", jwtMiddleware, (req, res) => {
  console.log("inside emptyCart api");
  //async
  dataService.emptyCart(req.body.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// get myitems cart after login  from user profile api
server.get("/getWishlist/:email", jwtMiddleware, (req, res) => {
  dataService.getWishlist(req.params.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// get my order cart after login  from user profile api
server.get("/getMyOrders/:email", jwtMiddleware, (req, res) => {
  dataService.getMyOrders(req.params.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// add to Checkout a  transcation jwtmiddleare used to verify token during login
server.post("/addToCheckout", jwtMiddleware, (req, res) => {
  console.log("inside addToCheckout api");
  //async
  dataService
    .addToCheckout(
      req.body.email,
      req.body.orderID,
      req.body.transactionID,
      req.body.dateAndTime,
      req.body.amount,
      req.body.status,
      req.body.products,
      req.body.detailes
    )
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Fetch all products
server.get('/api/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' });
    } else {
      res.status(200).json(products);
    }
  });
});

// Add a new product
server.post('/api/products', (req, res) => {
  addProduct(req.body).then((product) => {
    res.status(201).json(product);
  }).catch((err) => {
    res.status(500).json({ message: 'Error adding product' });
  });
});

// Delete a product
server.delete('/api/products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting product' });
    } else {
      res.status(200).json(product);
    }
  });
});
