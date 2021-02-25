import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();
// test("should add event to calendar", async () => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//     await page.goto("http://localhost:3000");
//     await page.evaluate((summary, description, participant) => {
//         document.getElementById("summary").value = summary;
//         document.getElementById("description").value = description;
//         document.getElementById("participant").value = participant;

//         setTimeout(() => {
//             document.getElementById("addParticipant").click();
//             document.getElementById("addEvent").click();
//         }, 500)

//     }, "my summary", "my description", "test@gmail.com");
//     await page.waitForNavigation();

// });

( async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.evaluate((summary, description, participant) => {
        console.log(participant);
        document.getElementById("summary").value = summary;
        document.getElementById("description").value = description;
        document.getElementById("participant").value = participant;

        setTimeout(() => {
            document.getElementById("addParticipant").click();
            document.getElementById("addEvent").click();
        }, 500)

    }, "my summary", "my description", "test@gmail.com");

    await page.on('dialog', async dialog => {
        console.log(dialog.message());
        // await dialog.dismiss();
        // browser.close();
      });
    const pages = await browser.pages();
    const popup = pages[pages.length - 1];
    popup.waitForTimeout(1000);
    popup.waitForSelector("#identifierId");
    await popup.$eval(`#identifierId`,  (e, email) => e.value = email, process.env.EMAIL);

        // await page.$eval(`#identifierId`,  (e, email) =>{ e.value = email;console.log(email)}, process.env.EMAIL);

    // await page.waitForNavigation();
    // await page.waitForSelector(`#identifierId`);
    // console.log(process.env.EMAIL)
    // await page.$eval(`#identifierId`,  (e, email) =>{ e.value = email;console.log(email)}, process.env.EMAIL);
})();