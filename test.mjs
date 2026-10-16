import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: 'AQ.Ab8RN6KssCm0oEG0TVlEv0vFnXw7WDRCxSBqFmC_jsAkDhTJYg',
});

async function generateWithRetry(modelName, prompt, retries = 3) {
  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`در حال ارسال درخواست به ${modelName} (تلاش ${i})...`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      if (error.status === 503 && i < retries) {
        console.log('سرور شلوغ بود، ۲ ثانیه صبر و تلاش مجدد...');
        await new Promise((res) => setTimeout(res, 2000));
      } else {
        throw error;
      }
    }
  }
}

async function run() {
  try {
    const text = await generateWithRetry(
      'gemini-3.5-flash-lite',
      'سلام! یک شعار کوتاه و جذاب برای یک آژانس هوش مصنوعی بنویس.'
    );
    console.log('\n--- پاسخ زنده از هوش مصنوعی ---\n');
    console.log(text);
  } catch (err) {
    console.log('\nدر حال امتحان مدل جایگزین (gemini-3.1-flash-lite)...');
    const text = await generateWithRetry(
      'gemini-3.1-flash-lite',
      'سلام! یک شعار کوتاه و جذاب برای یک آژانس هوش مصنوعی بنویس.'
    );
    console.log('\n--- پاسخ زنده از هوش مصنوعی ---\n');
    console.log(text);
  }
}

run();