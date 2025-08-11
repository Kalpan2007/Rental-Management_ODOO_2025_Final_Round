const Product = require('../models/Product');
const Pricelist = require('../models/Pricelist');

// Create pricelist
const createPricelist = async (req, res) => {
  try {
    const { name, customerId, productCategory, rules, validityStart, validityEnd } = req.body;
    
    const pricelist = new Pricelist({
      name,
      customerId,
      productCategory,
      rules,
      validityStart,
      validityEnd
    });
    
    await pricelist.save();
    res.status(201).json(pricelist);
  } catch (error) {
    console.error('Error creating pricelist:', error);
    res.status(500).json({ message: 'Error creating pricelist', error: error.message });
  }
};

// Get all pricelists
const getPricelists = async (req, res) => {
  try {
    const pricelists = await Pricelist.find();
    res.json(pricelists);
  } catch (error) {
    console.error('Error fetching pricelists:', error);
    res.status(500).json({ message: 'Error fetching pricelists', error: error.message });
  }
};

// Get pricelist by ID
const getPricelistById = async (req, res) => {
  try {
    const pricelist = await Pricelist.findById(req.params.id);
    if (!pricelist) {
      return res.status(404).json({ message: 'Pricelist not found' });
    }
    res.json(pricelist);
  } catch (error) {
    console.error('Error fetching pricelist:', error);
    res.status(500).json({ message: 'Error fetching pricelist', error: error.message });
  }
};

// Update pricelist
const updatePricelist = async (req, res) => {
  try {
    const { name, customerId, productCategory, rules, validityStart, validityEnd } = req.body;
    
    const pricelist = await Pricelist.findByIdAndUpdate(
      req.params.id,
      {
        name,
        customerId,
        productCategory,
        rules,
        validityStart,
        validityEnd
      },
      { new: true }
    );
    
    if (!pricelist) {
      return res.status(404).json({ message: 'Pricelist not found' });
    }
    
    res.json(pricelist);
  } catch (error) {
    console.error('Error updating pricelist:', error);
    res.status(500).json({ message: 'Error updating pricelist', error: error.message });
  }
};

// Delete pricelist
const deletePricelist = async (req, res) => {
  try {
    const pricelist = await Pricelist.findByIdAndDelete(req.params.id);
    
    if (!pricelist) {
      return res.status(404).json({ message: 'Pricelist not found' });
    }
    
    res.json({ message: 'Pricelist deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricelist:', error);
    res.status(500).json({ message: 'Error deleting pricelist', error: error.message });
  }
};

// Add pricing rule to existing pricelist
const addPricingRule = async (req, res) => {
  try {
    const { durationType, price, discount, startDate, endDate } = req.body;
    
    const pricelist = await Pricelist.findById(req.params.id);
    
    if (!pricelist) {
      return res.status(404).json({ message: 'Pricelist not found' });
    }
    
    pricelist.rules.push({
      durationType,
      price,
      discount,
      startDate,
      endDate
    });
    
    await pricelist.save();
    res.json(pricelist);
  } catch (error) {
    console.error('Error adding pricing rule:', error);
    res.status(500).json({ message: 'Error adding pricing rule', error: error.message });
  }
};

// Get applicable price for a product
const getProductPrice = async (req, res) => {
  try {
    const { productId, customerId, durationType } = req.query;
    
    if (!productId || !durationType) {
      return res.status(400).json({ message: 'Product ID and duration type are required' });
    }
    
    // Get the product's base price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    let basePrice = product.price;
    
    // Find applicable pricelists (customer-specific first, then general)
    const now = new Date();
    const pricelists = await Pricelist.find({
      $or: [
        { customerId },
        { customerId: { $exists: false } }
      ],
      validityStart: { $lte: now },
      $or: [
        { validityEnd: { $gte: now } },
        { validityEnd: { $exists: false } }
      ],
      $or: [
        { productCategory: product.category },
        { productCategory: { $exists: false } }
      ]
    }).sort({ customerId: -1 }); // Customer-specific first
    
    // Find the applicable rule
    let finalPrice = basePrice;
    let appliedDiscount = 0;
    
    if (pricelists.length > 0) {
      // Use the first matching pricelist (customer-specific has priority)
      const pricelist = pricelists[0];
      
      // Find matching rule
      const matchingRule = pricelist.rules.find(rule => 
        rule.durationType === durationType &&
        (!rule.startDate || new Date(rule.startDate) <= now) &&
        (!rule.endDate || new Date(rule.endDate) >= now)
      );
      
      if (matchingRule) {
        if (matchingRule.price) {
          finalPrice = matchingRule.price;
        } else if (matchingRule.discount) {
          appliedDiscount = matchingRule.discount;
          finalPrice = basePrice * (1 - matchingRule.discount / 100);
        }
      }
    }
    
    res.json({
      productId,
      basePrice,
      finalPrice,
      appliedDiscount,
      durationType
    });
  } catch (error) {
    console.error('Error calculating product price:', error);
    res.status(500).json({ message: 'Error calculating product price', error: error.message });
  }
};

module.exports = { 
  createPricelist,
  getPricelists,
  getPricelistById,
  updatePricelist,
  deletePricelist,
  addPricingRule,
  getProductPrice
};