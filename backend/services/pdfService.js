const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Generate a rental contract PDF
 * @param {Object} booking - The booking object with populated product and customer
 * @returns {Promise<string>} - The path to the generated PDF
 */
const generateContract = async (booking) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filename = `contract_${booking._id}.pdf`;
      const filePath = path.join(uploadsDir, filename);
      const writeStream = fs.createWriteStream(filePath);

      // Pipe PDF to file
      doc.pipe(writeStream);

      // Add content
      doc.fontSize(20).text('RENTAL AGREEMENT', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Contract ID: ${booking._id}`, { align: 'left' });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left' });
      doc.moveDown();

      // Customer details
      doc.fontSize(14).text('Customer Information', { underline: true });
      doc.fontSize(12).text(`Name: ${booking.customerId.name}`);
      doc.text(`Email: ${booking.customerId.email}`);
      doc.text(`Phone: ${booking.customerId.phone || 'N/A'}`);
      doc.text(`Address: ${booking.customerId.address || 'N/A'}`);
      doc.moveDown();

      // End user details if different from customer
      if (booking.endUser && booking.endUser.name) {
        doc.fontSize(14).text('End User Information', { underline: true });
        doc.fontSize(12).text(`Name: ${booking.endUser.name}`);
        doc.text(`Email: ${booking.endUser.email || 'N/A'}`);
        doc.text(`Phone: ${booking.endUser.phone || 'N/A'}`);
        doc.moveDown();
      }

      // Product details
      doc.fontSize(14).text('Product Information', { underline: true });
      doc.fontSize(12).text(`Name: ${booking.productId.name}`);
      doc.text(`Description: ${booking.productId.description || 'N/A'}`);
      doc.text(`Category: ${booking.productId.category || 'N/A'}`);
      doc.moveDown();

      // Rental details
      doc.fontSize(14).text('Rental Details', { underline: true });
      doc.fontSize(12).text(`Start Date: ${new Date(booking.startDate).toLocaleDateString()}`);
      doc.text(`End Date: ${new Date(booking.endDate).toLocaleDateString()}`);
      doc.text(`Unit Price: $${booking.unitPrice.toFixed(2)}`);
      doc.text(`Total Price: $${booking.totalPrice.toFixed(2)}`);
      doc.moveDown();

      // Terms and conditions
      doc.fontSize(14).text('Terms and Conditions', { underline: true });
      doc.fontSize(10).text('1. The renter agrees to return the item in the same condition as received.');
      doc.text('2. Late returns will incur additional fees as specified in the rental agreement.');
      doc.text('3. Damage to the item beyond normal wear and tear will result in repair or replacement charges.');
      doc.text('4. The renter is responsible for the item during the entire rental period.');
      doc.moveDown(2);

      // Signatures
      doc.fontSize(12).text('Customer Signature: _______________________', { align: 'left' });
      doc.moveDown();
      doc.text('Company Representative: _______________________', { align: 'left' });

      // Finalize PDF
      doc.end();

      writeStream.on('finish', () => {
        resolve(`/uploads/${filename}`);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate a pickup document PDF
 * @param {Object} booking - The booking object with populated product and customer
 * @returns {Promise<string>} - The path to the generated PDF
 */
const generatePickupDocument = async (booking) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filename = `pickup_${booking._id}.pdf`;
      const filePath = path.join(uploadsDir, filename);
      const writeStream = fs.createWriteStream(filePath);

      // Pipe PDF to file
      doc.pipe(writeStream);

      // Add content
      doc.fontSize(20).text('PICKUP DOCUMENT', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Booking ID: ${booking._id}`, { align: 'left' });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left' });
      doc.moveDown();

      // Customer details
      doc.fontSize(14).text('Customer Information', { underline: true });
      doc.fontSize(12).text(`Name: ${booking.customerId.name}`);
      doc.text(`Email: ${booking.customerId.email}`);
      doc.moveDown();

      // Product details
      doc.fontSize(14).text('Product Information', { underline: true });
      doc.fontSize(12).text(`Name: ${booking.productId.name}`);
      doc.text(`Description: ${booking.productId.description || 'N/A'}`);
      doc.moveDown();

      // Pickup details
      doc.fontSize(14).text('Pickup Details', { underline: true });
      doc.fontSize(12).text(`Pickup Date: ${new Date(booking.pickupDate || Date.now()).toLocaleDateString()}`);
      doc.moveDown();

      // Condition checklist
      doc.fontSize(14).text('Condition Checklist', { underline: true });
      doc.fontSize(12).text('□ Item is in good working condition');
      doc.text('□ No visible damage or defects');
      doc.text('□ All accessories included');
      doc.text('□ Customer has been instructed on proper use');
      doc.moveDown(2);

      // Signatures
      doc.fontSize(12).text('Customer Signature: _______________________', { align: 'left' });
      doc.moveDown();
      doc.text('Company Representative: _______________________', { align: 'left' });

      // Finalize PDF
      doc.end();

      writeStream.on('finish', () => {
        resolve(`/uploads/${filename}`);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate a return document PDF
 * @param {Object} booking - The booking object with populated product and customer
 * @returns {Promise<string>} - The path to the generated PDF
 */
const generateReturnDocument = async (booking) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filename = `return_${booking._id}.pdf`;
      const filePath = path.join(uploadsDir, filename);
      const writeStream = fs.createWriteStream(filePath);

      // Pipe PDF to file
      doc.pipe(writeStream);

      // Add content
      doc.fontSize(20).text('RETURN DOCUMENT', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Booking ID: ${booking._id}`, { align: 'left' });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left' });
      doc.moveDown();

      // Customer details
      doc.fontSize(14).text('Customer Information', { underline: true });
      doc.fontSize(12).text(`Name: ${booking.customerId.name}`);
      doc.text(`Email: ${booking.customerId.email}`);
      doc.moveDown();

      // Product details
      doc.fontSize(14).text('Product Information', { underline: true });
      doc.fontSize(12).text(`Name: ${booking.productId.name}`);
      doc.text(`Description: ${booking.productId.description || 'N/A'}`);
      doc.moveDown();

      // Return details
      doc.fontSize(14).text('Return Details', { underline: true });
      doc.fontSize(12).text(`Return Date: ${new Date(booking.returnDate || Date.now()).toLocaleDateString()}`);
      doc.text(`Late Fee: $${booking.lateFee.toFixed(2)}`);
      doc.moveDown();

      // Condition checklist
      doc.fontSize(14).text('Condition Checklist', { underline: true });
      doc.fontSize(12).text('□ Item returned in good working condition');
      doc.text('□ No new damage or defects');
      doc.text('□ All accessories returned');
      doc.text('□ Additional notes: ________________________________');
      doc.moveDown(2);

      // Signatures
      doc.fontSize(12).text('Customer Signature: _______________________', { align: 'left' });
      doc.moveDown();
      doc.text('Company Representative: _______________________', { align: 'left' });

      // Finalize PDF
      doc.end();

      writeStream.on('finish', () => {
        resolve(`/uploads/${filename}`);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateContract,
  generatePickupDocument,
  generateReturnDocument
};