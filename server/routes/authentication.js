const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');

router.post('/check_session', async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return null;

    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.log('Error checking session', error);
  }
});

router.post('/sign_up', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    res.cookie('token', data.session.access_token, {
      httpOnly: true,
      secure: false, // set to true for prod
      maxAge: 3600000,
    });

    res.json(data);
  } catch (error) {
    console.log('Error signing up', error);
  } finally {
    console.log('✅ SIGN UP SUCCESSFUL ✅');
  }
});

router.post('/sign_in', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    res.cookie('token', data.session.access_token, {
      httpOnly: true,
      secure: false, // set to true for prod
      maxAge: 3600000,
    });

    res.json(data);
  } catch (error) {
    console.log('Error signing in', error);
  } finally {
    console.log('✅ SIGN IN SUCCESSFUL ✅');
  }
});

router.post('/sign_out', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.clearCookie('token');
    res.send('Signed out successfully');
  } catch (error) {
    console.log('Error signing out', error);
  } finally {
    console.log('✅ SIGN OUT SUCCESSFUL ✅');
  }
});

module.exports = router;
