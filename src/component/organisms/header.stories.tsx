import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoriesProviderWrapper } from '@stories/ProviderWrapper';
import { Header } from '@component/organisms/header';

export default {
  title: 'header',
  component: Header,
} as ComponentMeta<typeof Header>;

const HeaderTemplate: ComponentStory<typeof Header> = () => (
  <StoriesProviderWrapper>
    <Header />
  </StoriesProviderWrapper>
);

export const HeaderStory = HeaderTemplate.bind({});
HeaderStory.args = {};
