import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({
  apiKey: 'AQ.Ab8RN6KssCm0oEG0TVlEv0vFnXw7WDRCxSBqFmC_jsAkDhTJYg',
});

async function buildLandingPage(niche) {
  console.log(`ایجنت در حال طراحی لندینگ‌پیج برای: ${niche}...`);

  const prompt = `
تو یک طراح ارشد وب هستی. برای موضوع "${niche}" یک صفحه فرود کامل، مدرن، ریسپانسیو و زیبا با HTML5 و کدهای درون‌برنامه‌ای CSS (یک فایل تک‌برگی) تولید کن.
- از فونت Vazirmatn یا سامانه سیستم استاندارد، گرادیان مدرن، بخش هدر، کارت‌های خدمات و دکمه فراخوان (CTA) استفاده کن.
- فقط و فقط کد خالص HTML را برگردان (بدون هیچ توضیح متنی اضافه یا بک‌تیک‌های مارک‌داون).
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: prompt,
  });

  let html = response.text.trim();
  if (html.startsWith('```html')) html = html.slice(7);
  if (html.startsWith('```')) html = html.slice(3);
  if (html.endsWith('```')) html = html.slice(0, -3);

  fs.writeFileSync('landing.html', html.trim());
  console.log('لندینگ‌پیج آماده شد: فایل landing.html در پوشه ساخته شد.');
}

buildLandingPage('آژانس خدمات اتوماسیون هوش مصنوعی و ربات‌های خودکار');