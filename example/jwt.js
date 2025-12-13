//jsonwebtoken aut jonn must



import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const payload = {
    id: '123',
    firstName: 'John Doe',
    lastName: 'Doe',
    email: 'john.doe@example.com',
}
const secretKey = 'my_super_secret_key';

// const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Secret:', secretKey);

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.log(err);
    } else {
        console.log(decoded);
    }
});

console.log(token);










/*
"jsonwebtoken" লাইব্রেরিটি প্রধানত স্টেটলেস অথেন্টিকেশন (stateless authentication) এবং নিরাপত্তার জন্য ব্যবহৃত হয়।
স্টেটলেস: সার্ভারে সেশন ডেটা সংরক্ষণ করার প্রয়োজন হয় না, যা অ্যাপ্লিকেশন স্কেল করতে সাহায্য করে। টোকেন নিজেই ব্যবহারকারীর তথ্য ধারণ করে।
নিরাপত্তা: প্রতিটি টোকেন ডিজিটালভাবে স্বাক্ষরিত (signed) থাকে, যাতে নিশ্চিত করা যায় যে এটি পরিবর্তন করা হয়নি এবং এটি একটি নির্ভরযোগ্য উৎস থেকে এসেছে।
অথরাইজেশন: টোকেন ব্যবহার করে সার্ভার দ্রুত যাচাই করতে পারে যে ব্যবহারকারীর কোনো নির্দিষ্ট রিসোর্স অ্যাক্সেস করার অনুমতি আছে কিনা।
সহজ কথায়, এটি ব্যবহারকারীর পরিচয় এবং অ্যাক্সেস নিয়ন্ত্রণ করার একটি নিরাপদ এবং কার্যকর উপায়।
*/