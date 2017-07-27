const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
function getHtml(url) {
    request(url, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            var $ = cheerio.load(body, {decodeEntities: false});
            var content = $("#detailContainer p").html() + "\r\n";
            fs.appendFileSync("mayo.csv", content);
            var nextLink = "http://www.yikedou.com" + $("#nextArcLink a").attr("href");
            getHtml(nextLink)
        }
        else console.log("爬完了");
    })
}
var url = "http://www.yikedou.com/wenzi/201510/48838.html";
getHtml(url);