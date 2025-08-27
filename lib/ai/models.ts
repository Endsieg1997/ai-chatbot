export const DEFAULT_CHAT_MODEL: string = 'medical-chat';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'medical-chat',
    name: '医疗助手',
    description: '专业的医疗健康咨询助手',
  },
];
