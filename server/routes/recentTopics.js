const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');

router.post('/recent_topics', async (req, res) => {
  try {
    console.log('GETTING RECENT TOPICS');
    const { data, error } = await supabase
      .from('topics')
      .select('topic_contents, fun_links')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.log('SUPABASE ERROR', error);
  } finally {
    console.log('✅ DONE GETTING TOPICS FROM SUPABASE ✅');
  }
});

module.exports = router;
