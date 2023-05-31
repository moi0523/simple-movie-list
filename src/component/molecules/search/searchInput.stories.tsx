import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoriesProviderWrapper } from '@stories/ProviderWrapper';
import { SearchInput } from '@component/molecules/search/searchInput';

export default {
  title: 'header',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const SearchInputTemplate: ComponentStory<typeof SearchInput> = () => (
  <StoriesProviderWrapper>
    <SearchInput />
  </StoriesProviderWrapper>
);

export const SearchInputStory = SearchInputTemplate.bind({});
SearchInputStory.args = {};
