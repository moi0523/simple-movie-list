import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoriesProviderWrapper } from '@stories/ProviderWrapper';
import { Button } from '@component/atoms/button';
import { border, borderRadius } from 'polished';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const ButtonTemplate: ComponentStory<typeof Button> = (args) => (
  <StoriesProviderWrapper>
    <Button {...args} />
  </StoriesProviderWrapper>
);

export const ButtonStory = ButtonTemplate.bind({});
ButtonStory.args = {
  overrides: {
    Root: {
      style: {
        width: '80px',
        height: '48px',
        backgroundColor: '#ffffff',
        ...border('1px', 'solid', '#000000'),
        ...borderRadius('top', '16px'),
        ...borderRadius('bottom', '16px'),
      },
    },
  },
  onClick: () => {
    alert('click');
  },
  children: <span>button</span>,
};
