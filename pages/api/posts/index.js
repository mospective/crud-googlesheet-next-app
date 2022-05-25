import { google } from 'googleapis';

export default async (req, res) => {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

    const sheets = google.sheets({ version: 'v4', auth });
  
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'A2:A',
    });
  
    const posts = response.data.values.flat();
    res.status(200).json(posts);

}