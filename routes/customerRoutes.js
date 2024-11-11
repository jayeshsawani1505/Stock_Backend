const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage for uploaded files

// Create a new customer
router.post('/', customerController.createCustomer);

// Get all customers
router.get('/', customerController.getAllCustomers);

router.get('/count', customerController.getCustomerCount);

// Get a customer by ID
router.get('/:id', customerController.getCustomerById);

// Update a customer by ID
router.put('/:id', customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

// API to upload and process Excel file
router.post('/upload-excel', upload.single('file'), customerController.uploadExcel);

// router.post('/upload-excel', upload.single('file'), async (req, res) => {
//     try {
//         const filePath = req.file.path;
//         const workbook = xlsx.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = xlsx.utils.sheet_to_json(worksheet);

//         // Loop through the data and insert each record
//         for (const row of jsonData) {
//             const customerData = {
//                 profile_photo: row.profile_photo,
//                 name: row.name,
//                 currency: row.currency,
//                 email: row.email,
//                 website: row.website,
//                 phone: row.phone,
//                 notes: row.notes,
//                 billing_name: row.billing_name,
//                 billing_address_line1: row.billing_address_line1,
//                 billing_address_line2: row.billing_address_line2,
//                 billing_country: row.billing_country,
//                 billing_state: row.billing_state,
//                 billing_city: row.billing_city,
//                 billing_pincode: row.billing_pincode,
//                 shipping_name: row.shipping_name,
//                 shipping_address_line1: row.shipping_address_line1,
//                 shipping_address_line2: row.shipping_address_line2,
//                 shipping_country: row.shipping_country,
//                 shipping_state: row.shipping_state,
//                 shipping_city: row.shipping_city,
//                 shipping_pincode: row.shipping_pincode,
//                 bank_name: row.bank_name,
//                 branch: row.branch,
//                 account_number: row.account_number,
//                 account_holder_name: row.account_holder_name,
//                 ifsc: row.ifsc
//             };

//             // Call your service function to insert the data into the database
//             await customerService.createCustomerService(customerData);
//         }

//         res.status(200).json({ message: 'Data uploaded successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to process the Excel file' });
//     }
// });

module.exports = router;
