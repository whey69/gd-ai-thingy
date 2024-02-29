const fetch = require('node-fetch');
const fs = require('fs');
const util = require('util');

const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
const log_stdout = process.stdout;
console.log = function (d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function fetchAndWriteComments(levelID, count, page, mode) {

    // you can replace http://localhost:2000 with https://gdbrowser.com but not recommended
    const url = `http://localhost:2000/api/comments/${levelID}?count=${count}&page=${page}&${mode}`;

    try {
        const res = await fetch(url);

        if (res.status === 204) {
            return 204;
        }

        const comments = await res.json();
        if (comments == -1) {
            console.log("failed trying again after 5 secs")
            await delay(5000)
            fetchAndWriteComments(levelID, count, page, mode)
            return
        }
        // fs.writeFileSync("comments.txt", comments)
        var result = ""
        comments.forEach(element => {
            result += `\n${element.username}: ${element.content}`;
        });
        // console.log(result)
        // if (result == "") console.log("got empty page")
        fs.appendFileSync("comments.txt", result)
    } catch (error) {
        console.log(`err line 40: ${err}`);
    }
}

const levelIDs = ['94350538', '96418989', '95325555', '96609002', '93288701', '95353635', '94813965', '91893984', '95516584', '96626685', '94962842']; // example levels
const count = 100;
const totalPages = 1500; 

const scrapeComments = async () => {
    for (let j = 0; j < levelIDs.length; j++) {
        const levelID = levelIDs[j];
        var page = 0;
        for (let i = 0; i <= totalPages; i++) {
            console.log(`fetching comments from page ${page}/${totalPages} on ${levelID}`)
            var st = fetchAndWriteComments(levelID, count, page, 0);
            if (st === 204) {
                console.log("recieved empty page")
                break;
            }
            page++;
            await delay(2500);  
        }
    }
}
scrapeComments();
