require('dotenv').config();
require('./connection/db.connection')();
const { swaggerUi, swaggerSpec } = require("./swagger/swagger.config");
const express = require('express');
const app = express(); // Remove 'new' keyword
const AI = require('./routes/aichat.routes');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

// const schemeModel = require('./models/scheme.model');

const chatRoute = require('./routes/jansahay.route');
const userRoute = require('./routes/user.routes');
const schemeRoute = require('./routes/scheme.routes');
const application = require('./routes/application.track.route');

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "PUT" , "POST", "DELET"]
}));


// Serve static files from public folder
app.use('/pdf', express.static('public'));

// Routes


//AI Models
app.use('/', AI);
app.use('/chat', chatRoute);

//user API
app.use('/user', userRoute);
app.use('/scheme', schemeRoute);
app.use('/application', application);


// Swagger Docs Route
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// const audioService = require('./groqAIModel/audio.service.model');


// (async () => {
//     let data = await audioService.speechToText("./speech.wav", "Specify context or spelling");
//     console.log(data);
// })()

// app.use('/uploadScheme')

app.listen(PORT,'0.0.0.0',(err) => {
    if (err) {
        console.log('Something went wrong:', err);
    } else {
        console.log(`🚀 Server running on port ${PORT}`);
    }
});

//     const scheme = new schemeModel({
//         shemename: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
//         details: `Ayushman Bharat, a flagship scheme of the Government of India, was launched as recommended by the National Health Policy 2017, to achieve the vision of 
// Universal Health Coverage (UHC). This initiative has been designed to meet Sustainable Development Goals (SDGs) and its underlining commitment, which is 
// to "leave no one behind." 
// Ayushman Bharat is an attempt to move from a sectoral and segmented approach to health service delivery to a comprehensive need-based health care 
// service. This scheme aims to undertake path-breaking interventions to holistically address the healthcare system (covering prevention, promotion, and 
// ambulatory care) at the primary, secondary, and tertiary levels. Ayushman Bharat adopts a continuum of care approach, comprising two inter-related 
// components, which are - 
// 1. Health and Wellness Centres (HWCs) 
// 2. Pradhan Mantri Jan Arogya Yojana (PM-JAY) 
// Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB PM-JAY) was launched on 23rd September 2018 in Ranchi, Jharkhand by the Hon’ble Prime Minister 
// of India, Shri Narendra Modi. 
// AB PM-JAY is the largest health assurance scheme in the world which aims at providing a health cover of ₹ 5,00,000 per family per year for secondary and 
// tertiary care hospitalization to over 10.74 crores poor and vulnerable families (approximately 50 crore beneficiaries) that form bottom 40% of the Indian 
// population. The households included is based on the deprivation and occupational criteria of the Socio-Economic Caste Census 2011 (SECC 2011) for rural and 
// urban areas respectively. PM-JAY is fully funded by the Government and the cost of implementation is shared between the Central and State Governments. `,
//         eligibility: `Rural Beneficiaries 
// Out of the total seven deprivation criteria for rural areas, PM-JAY covered all such families who fall into at least one of the following six deprivation criteria and 
// automatic inclusion(Destitute/ living on alms, manual scavenger households, primitive tribal group, legally released bonded labour) criteria: 
// 1. Only one room with kucha walls and kucha roof 
// 2. No adult member between ages 16 to 59 
// 3. Households with no adult male member between ages 16 to 59 
// 4. Disabled member and no able-bodied adult member 
// 5. SC/ST households 
// 6. Landless households deriving a major part of their income from manual casual labour 
// Urban Beneficiaries 
// For urban areas, the following 11 occupational categories of workers are eligible for the scheme: 
// 1. Ragpicker 
// 2. Beggar 
// 3. Domestic worker 
// 4. Street vendor/ Cobbler/hawker / other service provider working on streets 
// 5. Construction worker/ Plumber/ Mason/ Labour/ Painter/ Welder/ Security guard/ Coolie and other head-load worker 
// 6. Sweeper/ Sanitation worker/ Mali 
// 7. Home-based worker/ Artisan/ Handicrafts worker/ Tailor 
// 8. Transport worker/ Driver/ Conductor/ Helper to drivers and conductors/ Cart puller/ Rickshaw puller 
// 9. Shop worker/ Assistant/ Peon in small establishment/ Helper/Delivery assistant / Attendant/ Waiter 
// 10. Electrician/ Mechanic/ Assembler/ Repair worker 
// 11. Washer-man/ Chowkidar`,
//         exclusions: `1. Those who own a two, three, or four-wheeler or a motorized fishing boat. 
// 2. Those who own mechanized farming equipment. 
// 3. Those who have Kisan cards with a credit limit of ₹50,000/-. 
// 4. Those employed by the government. 
// 5. Those who work in government-managed non-agricultural enterprises. 
// 6. Those earning a monthly income above ₹10,000/-. 
// 7. Those owning refrigerators and landlines. 
// 8. Those with decent, solidly built houses. 
// 9. Those owning 5 acres or more of agricultural land.`,
//         applicationProcess: `Offline 
// The Arogya Mitra searches the available list of beneficiaries using details such as name, location, ration card number, mobile number, or the RSBY URN of the 
// beneficiary. After this, the beneficiary is searched for in the BIS. The individual is identified and the scanned valid ID documents are then uploaded. 
// To get a PMJAY e-card for themselves and their family, a potential beneficiary needs to visit either a hospital or a Community Service Centre (CSC) for 
// identification and follow the steps mentioned below: 
// Step 1: Potential AB-PMJAY beneficiaries are to submit the PM letter/ RSBY URN/ RC Number/ Mobile Number - The operator (commonly known as the 
// Arogya Mitra) searches the available list of beneficiaries. The operator does this by entering details such as name, location, Ration Card number, mobile 
// number, or even RSBY URN of the beneficiary. 
// Step 2: Search in the BIS Application - The operator searches for the potential beneficiary in the entitled SECC, RSBY, State Health Scheme, Additional Data 
// Collection Drive databases. 
// Step 3: Individual Identification - The identification process is carried out if the name is found in the list. For this, documents like Aadhaar or any government 
// ID and a Ration Card or an alternative family ID are required to validate against the details available in the system. Scanned documents are then uploaded. 
// Step 4: Family Identification - The Arogya Mitra then identifies the family records through the ration card and the scanned documents are then uploaded. The 
// Arogya Mitra then submits the individual and family records to the trust/insurance company for approval. 
// Step 5: Approval or Rejection - The Health insurance company or trust may then approve or recommend rejection for the submitted beneficiaries. The cases 
// that are recommended for rejection will be finally verified for approval or rejection by the State Health Agency (SHA). 
// Step 6: E-card Issuance - On approval by SHA/insurance company/trust, an e-card will be issued to the beneficiary.`,
//         documentsRequired: `1. Age & Identity Proof (Aadhaar Card / PAN Card). 
// 2. Proof of Address. 
// 3. Contact details (Mobile, e-mail). 
// 4. Caste Certificate. 
// 5. Income Certificate. 
// 6. Document Proof of the Current Status of the Family (Joint or Nuclear). 
// 7. Aadhaar Card.`
//     });

//     const savedScheme = await scheme.save();
//     if(savedScheme){
//         console.log('document inserted');
//     }else{
//         console.log('document failed');
//     }
// }

// insertScheme();



// const { Server } = require("socket.io");

// const io = new Server(8000, {
//   cors: true,
// });

// const emailToSocketIdMap = new Map();
// const socketidToEmailMap = new Map();

// io.on("connection", (socket) => {
//   console.log(`Socket Connected`, socket.id);
//   socket.on("room:join", (data) => {
//     const { email, room } = data;
//     emailToSocketIdMap.set(email, socket.id);
//     socketidToEmailMap.set(socket.id, email);
//     io.to(room).emit("user:joined", { email, id: socket.id });
//     socket.join(room);
//     io.to(socket.id).emit("room:join", data);
//   });

//   socket.on("user:call", ({ to, offer }) => {
//     io.to(to).emit("incomming:call", { from: socket.id, offer });
//   });

//   socket.on("call:accepted", ({ to, ans }) => {
//     io.to(to).emit("call:accepted", { from: socket.id, ans });
//   });

//   socket.on("peer:nego:needed", ({ to, offer }) => {
//     console.log("peer:nego:needed", offer);
//     io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
//   });

//   socket.on("peer:nego:done", ({ to, ans }) => {
//     console.log("peer:nego:done", ans);
//     io.to(to).emit("peer:nego:final", { from: socket.id, ans });
//   });
// });