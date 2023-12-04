const uploadThumbnailSupabase = async (thumbnail) => {
  return null;
  const base64Data = Buffer.from(thumbnail, 'base64');
  const filePath = `thumbnail_${Date.now()}.png`;

  try {
    console.log('UPLOADING THUMBNAIL TO SUPABASE');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, base64Data, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw error;

    const { data: urlData, error: urlError } = await supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    if (urlError) throw urlError;

    const publicUrl = urlData.publicUrl;

    return publicUrl;
  } catch (error) {
    console.log('SUPABASE THUMBNAIL UPLOAD ERROR', error);
  } finally {
    console.log('✅ DONE UPLOADING THUMBNAIL TO SUPABASE ✅');
  }
};

const generateThumbnail = async (topic, majorTopic) => {
  return null;
  try {
    const imagePrompt = `${topic} with respect to ${majorTopic} in the style of minimalism.`;
    let openAIResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });
    const imageUrl = openAIResponse.data[0].b64_json;
    const supabaseUrl = await uploadThumbnailSupabase(imageUrl);
    return supabaseUrl;
  } catch (error) {
    console.log('IMAGE GENERATION ERROR', error);
  }
};

const addThumbnailsToResponse = async (openAIResponse) => {
  const openAIObject = JSON.parse(openAIResponse);
  const majorTopic = openAIObject.title;
  if (!openAIObject.topics) {
    return false;
  }

  for (const topic of openAIObject.topics) {
    topic.thumbnail = await generateThumbnail(topic.name, majorTopic);
  }

  return openAIObject;
};

module.exports = {
  uploadThumbnailSupabase,
  generateThumbnail,
  addThumbnailsToResponse,
};
