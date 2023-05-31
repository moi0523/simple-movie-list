import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoriesProviderWrapper } from '@stories/ProviderWrapper';
import { Input } from '@component/atoms/input';
import { border, padding } from 'polished';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const InputTemplate: ComponentStory<typeof Input> = (args) => (
  <StoriesProviderWrapper>
    <Input {...args} />
  </StoriesProviderWrapper>
);

export const InputStory = InputTemplate.bind({});
InputStory.args = {
  overrides: {
    Root: {
      style: {
        width: '80px',
        height: '48px',
        backgroundColor: '#ffffff',
        ...border('1px', 'solid', '#000000'),
        ...padding('1px', '16px'),
      },
    },
  },
  disabled: false,
  placeholder: '입력해주세요.',
};
