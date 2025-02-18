import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNTextDetector from 'react-native-text-detector';
import { processContent } from '../utils/contentProcessor';

export default function CreateScreen() {
  const [content, setContent] = useState(null);
  const [options, setOptions] = useState({
    summarize: false,
    translate: false,
    qa: false,
  });

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      processFile(res);
    } catch (err) {
      console.log(err);
    }
  };

  const processFile = async (file) => {
    let text = '';
    if (file.type === 'application/pdf') {
      text = await PDFLib.getText(file.uri);
    } else {
      const visionResp = await RNTextDetector.detectFromUri(file.uri);
      text = visionResp.map(item => item.text).join(' ');
    }
    setContent({ ...file, text });
  };

  const handleProcess = async () => {
    const processed = await processContent(content.text, options);
    setContent({ ...content, processed });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
        <Text>اختر ملفًا أو صورة</Text>
      </TouchableOpacity>

      {content && (
        <>
          <TextInput
            multiline
            value={content.text}
            onChangeText={text => setContent({ ...content, text })}
            style={styles.textArea}
          />

          <View style={styles.options}>
            <OptionToggle
              label="تلخيص"
              value={options.summarize}
              onToggle={v => setOptions({ ...options, summarize: v })}
            />
            <OptionToggle
              label="ترجمة"
              value={options.translate}
              onToggle={v => setOptions({ ...options, translate: v })}
            />
            <OptionToggle
              label="أسئلة"
              value={options.qa}
              onToggle={v => setOptions({ ...options, qa: v })}
            />
          </View>

          <Button title="تحويل" onPress={handleProcess} />
        </>
      )}
    </View>
  );
}
