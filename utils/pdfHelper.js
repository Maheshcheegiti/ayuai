import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export const generateHealthReportPdf = async (reportText) => {
  const logo = Asset.fromModule(require("../assets/icon.png"));
  await logo.downloadAsync();

  const timestamp = new Date().toLocaleString();
  const html = `
    <html>
      <head>
        <style>
          @page {
            margin: 40px;
          }
          body {
            font-family: 'Helvetica';
            position: relative;
            color: #222;
            padding: 20px;
            background-color: #fff;
          }
          .header {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .logo {
            width: 60px;
            margin-right: 15px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            color: #32CA9A;
          }
          .section {
            margin-top: 20px;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
          }
          .footer {
            position: absolute;
            bottom: 20px;
            left: 40px;
            right: 40px;
            text-align: center;
            font-size: 12px;
            color: #aaa;
          }
          .watermark {
            position: fixed;
            top: 35%;
            left: 25%;
            width: 300px;
            opacity: 0.05;
            z-index: 0;
          }
        </style>
      </head>
      <body>
        <img src="${logo.uri}" class="watermark" />
        
        <div class="header">
          <img src="${logo.uri}" class="logo" />
          <div class="title">AyuAi Health Report</div>
        </div>

        <div class="section">${reportText}</div>

        <div class="footer">Generated on ${timestamp} by AyuAi</div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  const fileName = `Health_Report_${Date.now()}.pdf`;
  const newPath = FileSystem.documentDirectory + fileName;

  await FileSystem.moveAsync({
    from: uri,
    to: newPath,
  });

  return { uri: newPath, fileName };
};
