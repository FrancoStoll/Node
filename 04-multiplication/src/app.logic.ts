import fs from 'fs'
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, l: limit, s: showTable } = yarg

const tableBase = base;

const message: string = `=============================\nTabla del ${tableBase}\n=============================\n`

let tableMessage: string = "\n";


for (let i = 1; i <= limit; i++) {

    tableMessage += `${tableBase} x ${i} = ${tableBase * i}\n`;

}

const fileMessage = message + tableMessage

const outputPath = `outputs`;

showTable && console.log(fileMessage)


fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/table-${tableBase}.txt`, fileMessage);
