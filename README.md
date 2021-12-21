# VLM Distribution Map tool

An application to find specific assets that exist at a destination.

- [Demo](https://vlm-ms-tools.netlify.app/)

## Step 1: Upload Destination Package Report

This is a list of packages currently active at a destination, according to MXP.

## Step 2: Upload Assets to be Updated

- This is a custom list of assets that need to be reviewed, updated or expired.
- IMPORTANT - The Step 2 sheet must list the Package Asset IDs in a column titled HDP.
- The preferred sheet layout should have three columns: Series | Episode | HDP.

## Step 3: Submit request

- With both sheets loaded, click submit to process.
- The two files will be compared and a table will be generated listing only the assets from the custom list that are also on the destination package report.
- You can also export the table as xslx.

Please note - each uploaded file should be xls or xlsx file type. And each file should only include one sheet in the workbook.

### Built with:

- [TableExport.js](https://github.com/clarketm/TableExport)
- [IBM Carbon Design System](https://github.com/carbon-design-system/carbon)
- HTML
- Vanilla JS
