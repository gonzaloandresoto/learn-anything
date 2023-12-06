const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');

const getUserCourses = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.log('SUPABASE ERROR', error);
  }
};

router.post('/', async (req, res) => {
  try {
    console.log('GETTING USER COURSES');
    const { userId } = req.body;
    const response = await getUserCourses(userId);
    console.log('COURSE RESPONSES', response);
    res.send(response);
  } catch (error) {
    console.log('ERROR GETTING USER COURSES', error);
  } finally {
    console.log('✅ GOT USER COURSES ✅');
  }
});

module.exports = router;
