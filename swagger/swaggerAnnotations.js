// swaggerAnnotations.js



/**
 * @swagger
 * /chat:
 *   get:
 *     summary: Chat with AI model
 *     tags: [Google AI Model Chat]
 *     parameters:
 *       - name: prompt
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: AI response returned
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /chat/jansahay:
 *   get:
 *     summary: Get JanSahay response based on user prompt
 *     description: Pass a text query in the 'prompt' parameter to get a response from the JanSahay service.
 *     tags: [JanSahay AI Model Chat]
 *     parameters:
 *       - in: query
 *         name: prompt
 *         schema:
 *           type: string
 *         required: true
 *         description: The text query to process
 *     responses:
 *       200:
 *         description: Successful response from JanSahay
 *       400:
 *         description: Missing or invalid prompt
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /chat/chatHistory:
 *   get:
 *     summary: Get JanSahay response based on user prompt
 *     description: pass refUser as query parameter to get chat history.
 *     tags: [JanSahay AI Model Chat]
 *     parameters:
 *       - in: query
 *         name: refUser
 *         schema:
 *           type: string
 *         required: true
 *         description: The text query to process
 *     responses:
 *       200:
 *         description: Successful response from JanSahay
 *       400:
 *         description: Missing or invalid prompt
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /user/userProfile:
 *   post:
 *     summary: Insert or update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refUserId:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: ["Male", "Female", "Other"]
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               state:
 *                 type: string
 *               areaOfResidence:
 *                 type: string
 *                 enum: ["Urban", "Rural"]
 *               caste:
 *                 type: string
 *               disabilities:
 *                 type: boolean
 *               educationLevel:
 *                 type: string
 *               employmentStatus:
 *                 type: string
 *               annualFamilyIncome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/getUserProfile:
 *   get:
 *     summary: Get user profile response based on user userId
 *     description: Pass a text query in the 'prompt' parameter to get a response from the JanSeva service.
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The text query to process
 *     responses:
 *       200:
 *         description: User Prifile Data Retrived Successfully
 *       400:
 *         description: User Profile Data Not Found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /user/loginUser:
 *   post:
 *     summary: Insert a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "John Doe"
 *               mobileNumber:
 *                 type: string
 *                 example: "1234567899"
 *               userType:
 *                 type: string
 *                 example: "Customer or Agent"
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User inserted successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/verifyOTP:
 *   post:
 *     summary: verify user by OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /scheme/getAllSchemes:
 *   get:
 *     summary: Fetch all schemes
 *     tags: [Scheme]
 *     responses:
 *       200:
 *         description: Schemes fetched successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /scheme/getAllAppliedScheme:
 *   get:
 *     summary: Fetch all applied schemes
 *     tags: [Scheme]
 *     parameters:
 *       - in: query
 *         name: refUser
 *         schema:
 *           type: string
 *         required: true
 *         description: refUser
 *     responses:
 *       200:
 *         description: Schemes fetched successfully
 *       404:
 *         description: No schemes found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /scheme/savedSchemes:
 *   get:
 *     summary: Fetch all schemes
 *     tags: [Scheme]
 *     parameters:
 *       - in: query
 *         name: refUser
 *         schema:
 *           type: string
 *         required: true
 *         description: The text query to process
 *     responses:
 *       200:
 *         description: Schemes fetched successfully
 *       404:
 *         description: No schemes found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /scheme/applyForScheme:
 *   post:
 *     summary: Apply for scheme
 *     tags: [Scheme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refUser:
 *                 type: string
 *                 example: "id"
 *               refSchemeId:
 *                 type: string
 *                 example: "id"
 *               userName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@gmail.com"
 *               dateOfBirth:
 *                 type: string
 *                 example: "2025-12-18"
 *               mobileNumber:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               category:
 *                 type: string
 *                 example: "General"
 *               aadharNumber:
 *                 type: string
 *                 example: "123456789012"
 *               panNumber:
 *                 type: string
 *                 example: "ABCD1234"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, State"
 *               city:
 *                 type: string
 *                 example: "City"
 *               state:
 *                 type: string
 *                 example: "State"
 *               pincode:
 *                 type: string
 *                 example: "123456"
 *               aadharCardLink:
 *                 type: string
 *                 example: "https://example.com/aadhar-card.jpg"
 *               panCardLink:
 *                 type: string
 *                 example: "https://example.com/pan-card.jpg"
 *               incomeCertificateLink:
 *                 type: string
 *                 example: "https://example.com/income-certificate.jpg"
 *               addressProofLink:
 *                 type: string
 *                 example: "https://example.com/address-proof.jpg"
 *               passportSizePhotoLink:
 *                 type: string
 *                 example: "https://example.com/passport-size-photo.jpg"
 *               isAknowledgementSent:
 *                 type: string
 *                 example: "true"
 *               isApplicationSubmitted:
 *                 type: string
 *                 example: "true"
 *             required:
 *     responses:
 *       200:
 *         description: User inserted successfully
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /scheme/checkEligibility:
 *   post:
 *     summary: Check eligibility for scheme
 *     tags: [Scheme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: string
 *                 example: "25"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               income:
 *                 type: string
 *                 example: "25000"
 *               occupation:
 *                 type: string
 *                 example: "Student"
 *               state:
 *                 type: string
 *                 example: "Maharashtra"
 *             required:
 *     responses:
 *       200:
 *         description: Eligible schemes found
 *       404:
 *         description: No eligible schemes found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /scheme/uploadScheme:
 *   post:
 *     summary: Upload Scheme File
 *     tags: [Scheme]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: Single scheme file to upload
 *             required:
 *               - pdf
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       500:
 *         description: Upload failed
 */

/**
 * @swagger
 * /application/trackApplication:
 *   get:
 *     summary: Track Application
 *     tags: [Application]
 *     parameters:
 *       - in: query
 *         name: refUser
 *         schema:
 *           type: string
 *         required: true
 *         description: refUser
 *     responses:
 *       200:
 *         description: Application Tracked Successfully
 *       500:
 *         description: Application Tracked Failed
 */

/**
 * @swagger
 * /application/trackAllApplication:
 *   get:
 *     summary: Track All Application
 *     tags: [Application]
 *     responses:
 *       200:
 *         description: Application Tracked Successfully
 *       500:
 *         description: Application Tracked Failed
 */
