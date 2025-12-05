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
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Single scheme file to upload
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       500:
 *         description: Upload failed
 */
