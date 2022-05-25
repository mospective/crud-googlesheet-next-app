import { google } from 'googleapis';

export default async (req, res) => {
    const id = req.query.post;

    const auth = new google.auth.GoogleAuth({
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
          ],
     });

    const sheets = google.sheets({ version: 'v4', auth });

    const range = `A${id}:D${id}`;

    switch(req.method) {
        case "GET":
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range,
            });
        
            const data = response.data.values[0];
            res.status(200).json(data);
        break;
        case "POST":
            const body = JSON.parse(req.body);
            const { country, city, population } = body;
            const submitResponse = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID,
                range: 'population!A2:D',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [[country, city, population]],
                },
              });
            
            res.status(201).json({ message: "It's sending data", submitResponse });
        break;
        case "DELETE":
            const resource = {
                "requests": [
                  {
                    "deleteDimension": {
                      "range": {
                        "dimension": "ROWS",
                        "startIndex": `${id - 1}`,
                        "endIndex": `${id}`
                      }
                    }
                  }
                ]
              };
              
            // const deletionResponse = await sheets.spreadsheets.values.clear({
            //     spreadsheetId: process.env.SHEET_ID,
            //     range
            // });

            const deletionResponse = await sheets.spreadsheets.batchUpdate({
                spreadsheetId: process.env.SHEET_ID,
                resource: resource,
              });
            res.status(202).json(deletionResponse);
        break;
        default: 
            res.status(405).end()
        break;
    }    
}