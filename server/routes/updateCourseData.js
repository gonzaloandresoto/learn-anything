const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');

const updateSupabaseData = async (courseId, courseData) => {
  try {
    console.log('UPDATING COURSE DATA IN SUPABASE');
    const { data, error } = await supabase
      .from('courses')
      .upsert({
        id: courseId,
        topic_contents: courseData,
      })
      .select('*');

    if (error) throw error;
  } catch (error) {
    console.log('SUPABASE ERROR', error);
  } finally {
    console.log('✅ UPDATED COURSE IN SUPABASE ✅');
  }
};

router.post('/', async (req, res) => {
  try {
    const { courseId, courseData } = req.body;
    const response = await updateSupabaseData(courseId, courseData);
    res.send('Course data updated in Supabase');
  } catch (error) {
    console.log('ERROR UPDATING SUPABASE COURSE', error);
  }
});

module.exports = router;
