const axios = require('axios');


const prefixPrompt = `
The following information is about a specific topic. You must answer questions only if they are related to this topic. If the question is unrelated, simply reply: “This question is not related to the given topic.”

Topic: Mukhyamantri - Majhi Ladki Bahin Yojana

Information:
Mukhyamantri - Majhi Ladki Bahin Yojana

FemaleFinancial AssistanceHealthNutrition
Check Eligibility
Details
The "Mukhyamantri - Majhi Ladki Bahin Yojana" scheme was launched by the Women and Child Development Department, Government of Maharashtra. The scheme aims to give economic freedom to women in the state age group of 21 to 65 years, improving their health and nutrition and strengthening their decisive role in the family. The women will get a financial benefit of ₹1,500/- through direct benefit transfer (DBT).

Benefits
Financial Assistance of ₹1,500/- per month. 

Eligibility
The applicant should be a female.
The applicant should be a resident of Maharashtra state.
The applicant's age should be between 21-65 years.
The applicant should have their bank account with an Aadhaar link.
The annual income of the applicant's family should not exceed ₹2,50,000/-. 
Outsourced employees, voluntary workers, and contract workers with income up to ₹2,50,000/- are eligible.
The applicant should be any one of the following:
Married Woman 
Widowed 
Divorced Woman
Abandoned and Destitute Women 
One Unmarried Woman in the family

Exclusions
The combined annual family income is more than ₹2,50,000/-.
The family member is an income taxpayer.
The family members are working as regular/permanent employees in a government department/undertaking/board/government of India or local body of the state government or are drawing pensions after retirement. 
The beneficiary women received ₹1,500 per month through the financial scheme implemented by other departments of the government.
The family member is a present or former MP/MLA.
The family member is the Chairman/Vice-Chairman/Director/Member of the Board/Corporation/Undertaking of the Government of India or State Government.
A person has a four-wheeler (excluding a tractor) registered in the name of their family members.

Application Process
Online
Registration Process:
Step 01: The interested applicant visit the official website. 
Step 02: Select "Applicant Login" and click on "Create Account."
Step 03: Complete the registration form with the following details: Full Name as per Aadhaar, Mobile No, Password, Confirm Password, District, Taluka, Village, Municipal Corporation / Council, Authorized Person & Accept Terms and Conditions. 
Step 04: Enter the Captcha code and click "Sign-up." You will receive an OTP.
Step 05: Enter the OTP and the Captcha code again.
Step 06: Click "Verify the OTP" to receive a message confirming that your login was successful.

Application Process:
Step 01: Log in to the portal using your Mobile number, Password, and Captcha to log in.
Step 02: Click on "Application of Mukhyamantri - Majhi Ladki Bahin Yojana" and enter your Aadhaar Number and Captcha.
Step 03: Click on "Valid Aadhaar" and complete the registration form with the applicant's name, bank details, and permanent address.
Step 04: Upload relevant documents such as an Aadhaar card, Domicile certificate, Ration card, etc.
Step 05: Click "Submit" to receive your application ID via SMS.

Check the Status:
Step 01: Log in to the portal using your Mobile number, Password, and Captcha to log in.
Step 02: Click on "Applications Made Earlier" to view the status of your applications.

Documents Required
Photograph of the Beneficiary Woman
Aadhaar Card
Domicile Certificate (If the Domicile Certificate is not available, any one of the following can be submitted: Ration Card issued before 15 years, Voter ID card issued before 15 years, Birth Certificate, or School Leaving Certificate).
For Women Born Abroad (Submit the Husband's Ration Card issued before 15 years, Voter ID card issued before 15 years, Birth Certificate, School Leaving Certificate, or Domicile Certificate).
Income Certificate (Not required if the woman has a Yellow or Orange Ration Card. Required if the woman has a White Ration Card or no Ration Card).
Marriage Certificate (If your name is not listed on the Ration Card and you are newly married, your husband’s Ration Card can be used as proof of income)
Bank Account Details (account should be Aadhaar-linked)
Affirmation Letter

also suggest user to pdf link below are the pdf name array, pickupt the pdf name as wanted to user and generate link :-
host - http://localhost:3000/pdf/pdf-name
pdfArray - ['Ayushman Bharat.pdf', 'Ladki Bahin.pdf', 'PM Kisan Yojana.pdf']

When the user asks a question, use only the information above to answer and also provide this information flexibility with multiple languages convert this information into user specific language and provide. Do not generate or assume anything outside it.
`;



const chatWithAI = async (req, res) => {
    try {
        const API_KEY = process.env.GOOGLE_API_KEY;
        const MODEL_NAME = process.env.MODEL_NAME;

        // Check if environment variables are set
        if (!API_KEY || !MODEL_NAME) {
            return res.status(500).json({
                success: false,
                message: 'API configuration missing'
            });
        }

        const prompt = prefixPrompt + '\n' + 'Question:' + req.query.prompt;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt parameter is required'
            });
        }

        // console.log('Making request to SerpAPI with prompt:', prompt);

        const apiUrl = `https://serpapi.com/search.json?engine=${MODEL_NAME}&q=${encodeURIComponent(prompt)}&api_key=${API_KEY}`;
        
        const apiRes = await axios.get(apiUrl);

        const filteredData = Object.fromEntries(
            Object.entries(apiRes.data).filter(([key]) =>
                key !== 'search_metadata' && key !== 'search_parameters' && key !== 'prompt' 
            )
        );

        res.json({
            success: true,
            data: filteredData,
        });

    } catch (error) {
        console.error('Error in chatWithAI:', error.message);
        res.status(500).json({
            success: false,
            data: [],
            error: error.message
        });
    }
}

module.exports = { chatWithAI };