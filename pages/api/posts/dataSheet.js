// import { google } from "googleapis";

// export default async (req, res) => {

//     if (req.method === "POST") {
//         const body = JSON.parse(req.body);
//         const { country, city, population } = body;

//         const auth = new google.auth.GoogleAuth({
//             scopes: [
//                 'https://www.googleapis.com/auth/spreadsheets',
//               ],
//          });

//         const sheets = google.sheets({ version: 'v4', auth });

//         const response = await sheets.spreadsheets.values.append({
//             spreadsheetId: process.env.SHEET_ID,
//             range: 'population!A2:C',
//             valueInputOption: 'USER_ENTERED',
//             requestBody: {
//                 values: [[country, city, population]],
//             },
//           });
        
//         res.status(201).json({ message: "It's sending data", response });
//     }
        
// }
