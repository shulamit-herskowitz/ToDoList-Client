import axios from 'axios';

// כתובת השרת כפי שמופיעה ב-VS Code שלך
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5011"

// הוספת Interceptor לתיעוד שגיאות בלוג (דרישה מהמטלה)
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  // שליפת כל המשימות
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/items`);    
    return result.data;
  },

  // הוספת משימה חדשה
  addTask: async (name) => {
    console.log('addTask', name);
    // שליחת אובייקט עם Name ו-IsComplete כפי שהשרת מצפה לקבל
    const result = await axios.post(`${apiUrl}/items`, { name: name, isComplete: false });
    return result.data;
  },

  // עדכון סטטוס ביצוע
  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    // שליחת בקשת PUT לעדכון המשימה לפי ה-ID שלה
    const result = await axios.put(`${apiUrl}/items/${id}`, { id: id, isComplete: isComplete });
    return result.data;
  },

  // מחיקת משימה
  deleteTask: async (id) => {
    console.log('deleteTask', id);
    // שליחת בקשת DELETE לכתובת המשימה הספציפית
    await axios.delete(`${apiUrl}/items/${id}`);
  }
};