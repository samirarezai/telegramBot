
import axios from "axios";
import moment from "moment";

const HomePage = () => {

// Your bot token
    const botToken = import.meta.env.VITE_BOT_TOKEN;

// Telegram Bot API URL for getting updates
    const url = `https://api.telegram.org/bot${botToken}/getUpdates`;
// Make the GET request
    const getData = () => {
        axios.get(url)
            .then(response => {
                const updates = response.data;
                console.log(updates);

                // Extract chat ID from the updates
                if (updates.result) {
                    updates.result.forEach(update => {
                        if (update.message && update.message.chat) {
                            const chatId = update.message.chat.id;
                            console.log(`Chat ID: ${chatId}`);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching updates:', error);
            });
    }

    const dataCheck = (label)=>{
        return `📅 ${moment().format('YYYY/MM/DD HH:mm:ss')}
            
💰 ${'قیمت فروش ' + label + ':'} ${63700} تومان 

💰 ${'قیمت خرید ' + label + ':'} ${63700} تومان 
            `;
    }

    async function sendMessage(chatId = "-1002234611571", text = "hello world") {
        const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const Euro= "یورو"
        const Dollar= "دلار"
        const payload = {
            chat_id: chatId,
            text: dataCheck(Euro)
        };

        try {
            const response = await axios.post(sendMessageUrl, payload);
            console.log('Message sent:', response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }



    return <div className='h-screen w-screen grid place-items-center'>
        <button onClick={getData}>
            getData
        </button>
        <button onClick={() => sendMessage()}>
            send message
        </button>
    </div>;
};

export default HomePage;
