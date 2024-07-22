/* eslint-disable no-undef */
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

function exitError(error) {
  console.error(`Error! ${error}`);
  process.exit(1);
}

(async () => {
  console.log(`\nGetting Telegram Bot`);
  const accessToken = process.env.TELEGRAM_BOT_TOKEN;
  const getBot = await axios
    .get(`https://api.telegram.org/bot${accessToken}/getMe`)
    .catch(exitError);
  const botUsername = getBot.data.result.username;
  const url = "https://fungame-fe.vercel.app/";

  console.log(`\nSetting bot ${botUsername} webapp url to ${url}`);
  const resp = await axios
    .post(`https://api.telegram.org/bot${accessToken}/setChatMenuButton`, {
      menu_button: {
        type: "web_app",
        text: "Fun Game",
        web_app: {
          url: url,
        },
      },
    })
    .catch(exitError);

  if (resp.status === 200) {
    console.log(
      `\nYou're all set! Visit https://t.me/${botUsername} to interact with your bot`
    );
    process.exit();
  } else {
    exitError(`\nSomething went wrong! ${resp.error}`);
  }
})();
