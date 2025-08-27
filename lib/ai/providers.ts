import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

// 创建自定义医疗API提供商
const medicalAPI = createOpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: 'sk-2a89671dcab74e449fae63b37ab6733a',
  name: 'deepseek-api',
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'medical-chat': chatModel,
        'medical-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'medical-chat': medicalAPI('deepseek-chat'),
        'medical-reasoning': wrapLanguageModel({
          model: medicalAPI('deepseek-chat'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': medicalAPI('deepseek-chat'),
        'artifact-model': medicalAPI('deepseek-chat'),
      },
    });
